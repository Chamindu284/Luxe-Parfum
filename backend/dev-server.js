import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
}

// Healthcheck
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
});

// Mock data
const mockProducts = [
    {
        _id: "1",
        name: "Chanel No. 5",
        brand: "Chanel",
        price: 150,
        originalPrice: 180,
        images: ["/chanel-no-5-perfume-bottle-elegant.jpg"],
        rating: 4.8,
        numReviews: 156,
        category: "women",
        scentFamily: "floral",
        stock: 25,
        featured: true,
        description: "A timeless floral fragrance that embodies elegance and sophistication.",
    },
    {
        _id: "2",
        name: "Tom Ford Black Orchid",
        brand: "Tom Ford",
        price: 180,
        images: ["/tom-ford-black-orchid-perfume-bottle-luxury.jpg"],
        rating: 4.6,
        numReviews: 89,
        category: "unisex",
        scentFamily: "oriental",
        stock: 15,
        featured: true,
        description: "A luxurious oriental fragrance with dark, mysterious notes.",
    },
    {
        _id: "3",
        name: "Dior Sauvage",
        brand: "Dior",
        price: 120,
        images: ["/dior-sauvage-perfume-bottle-masculine.jpg"],
        rating: 4.7,
        numReviews: 234,
        category: "men",
        scentFamily: "fresh",
        stock: 30,
        featured: true,
        description: "A fresh and modern fragrance for the contemporary man.",
    },
    {
        _id: "4",
        name: "Yves Saint Laurent Black Opium",
        brand: "Yves Saint Laurent",
        price: 140,
        images: ["/ysl-black-opium-perfume-bottle-elegant-black.jpg"],
        rating: 4.5,
        numReviews: 178,
        category: "women",
        scentFamily: "oriental",
        stock: 20,
        featured: false,
        description: "A bold and addictive fragrance with coffee and vanilla notes.",
    },
    {
        _id: "5",
        name: "Creed Aventus",
        brand: "Creed",
        price: 350,
        images: ["/creed-aventus-perfume-bottle-luxury-premium.jpg"],
        rating: 4.9,
        numReviews: 67,
        category: "men",
        scentFamily: "woody",
        stock: 8,
        featured: true,
        description: "A premium woody fragrance inspired by the dramatic life of a historic emperor.",
    },
    {
        _id: "6",
        name: "Jo Malone London Lime Basil & Mandarin",
        brand: "Jo Malone",
        price: 110,
        images: ["/jo-malone-lime-basil-mandarin-perfume-bottle-minim.jpg"],
        rating: 4.4,
        numReviews: 92,
        category: "unisex",
        scentFamily: "citrus",
        stock: 18,
        featured: false,
        description: "A fresh and zesty fragrance with lime, basil, and mandarin notes.",
    },
];

// In-memory storage for development
let users = [];
let orders = [];

// Products API
app.get("/api/products", (req, res) => {
    const { category, featured, brand, scentFamily, minPrice, maxPrice, keyword, page = 1, limit = 12, sort } = req.query;

    let filteredProducts = [...mockProducts];

    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (featured === 'true') {
        filteredProducts = filteredProducts.filter(p => p.featured);
    }

    if (brand) {
        const brands = brand.split(',');
        filteredProducts = filteredProducts.filter(p => brands.includes(p.brand));
    }

    if (scentFamily) {
        const families = scentFamily.split(',');
        filteredProducts = filteredProducts.filter(p => families.includes(p.scentFamily));
    }

    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }

    if (keyword) {
        const searchTerm = keyword.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.brand.toLowerCase().includes(searchTerm)
        );
    }

    // Sorting
    if (sort) {
        switch (sort) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                // Mock newest sorting
                break;
        }
    }

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
        products: paginatedProducts,
        page: parseInt(page),
        pages: Math.ceil(filteredProducts.length / limit),
        total: filteredProducts.length,
    });
});

app.get("/api/products/:id", (req, res) => {
    const product = mockProducts.find(p => p._id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
});

// Auth API
app.post("/api/users/register", (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "Email already in use" });
    }

    const user = {
        _id: `user_${Date.now()}`,
        name,
        email,
        isAdmin: false,
        createdAt: new Date().toISOString(),
    };

    users.push(user);

    // Generate mock JWT token
    const token = `mock-jwt-${Date.now()}`;

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
    });
});

app.post("/api/users/login", (req, res) => {
    const { email, password } = req.body;

    // For development, accept any email/password combination
    let user = users.find(u => u.email === email);

    if (!user) {
        // Create user if doesn't exist (for development)
        user = {
            _id: `user_${Date.now()}`,
            name: email.split('@')[0],
            email,
            isAdmin: false,
            createdAt: new Date().toISOString(),
        };
        users.push(user);
    }

    const token = `mock-jwt-${Date.now()}`;

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token,
    });
});

app.get("/api/users/profile", (req, res) => {
    // Mock profile - in real app, verify JWT token
    const user = {
        _id: "user_123",
        name: "Test User",
        email: "test@example.com",
        isAdmin: false,
    };
    res.json(user);
});

// Orders API
app.post("/api/orders", (req, res) => {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    const order = {
        _id: `order_${Date.now()}`,
        orderItems,
        shippingAddress,
        paymentMethod,
        totalPrice: orderItems.reduce((total, item) => total + (item.price * item.qty), 0),
        isPaid: false,
        isDelivered: false,
        createdAt: new Date().toISOString(),
    };

    orders.push(order);

    res.status(201).json(order);
});

app.get("/api/orders/myorders", (req, res) => {
    // Mock orders - in real app, filter by user ID from JWT
    res.json(orders);
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Development server running on http://localhost:${PORT}`);
    console.log(`📝 Note: This is a development server with mock data`);
    console.log(`🔧 To use real MongoDB, whitelist your IP in Atlas and use: npm run dev`);
});
