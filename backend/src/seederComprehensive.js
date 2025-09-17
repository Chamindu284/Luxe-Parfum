import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB.js";
import Product from "./models/Product.js";
import { comprehensiveProducts } from "./data/comprehensiveProducts.js";

dotenv.config();

const seedProducts = async () => {
    try {
        // Connect to MongoDB
        await connectDB();
        console.log("✅ Connected to MongoDB");

        // Clear existing products
        await Product.deleteMany({});
        console.log("🗑️  Cleared existing products");

        // Insert new products
        const createdProducts = await Product.insertMany(comprehensiveProducts);
        console.log(`✅ Created ${createdProducts.length} products`);

        // Display summary by category
        const categories = [...new Set(comprehensiveProducts.map(p => p.category))];
        console.log("\n📊 Products by Category:");
        categories.forEach(category => {
            const count = comprehensiveProducts.filter(p => p.category === category).length;
            console.log(`   ${category}: ${count} products`);
        });

        // Display summary by scent family
        const scentFamilies = [...new Set(comprehensiveProducts.map(p => p.scentFamily))];
        console.log("\n🌸 Products by Scent Family:");
        scentFamilies.forEach(family => {
            const count = comprehensiveProducts.filter(p => p.scentFamily === family).length;
            console.log(`   ${family}: ${count} products`);
        });

        // Display featured products
        const featuredCount = comprehensiveProducts.filter(p => p.featured).length;
        console.log(`\n⭐ Featured Products: ${featuredCount}`);

        // Display price range
        const prices = comprehensiveProducts.map(p => p.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        console.log(`\n💰 Price Range: $${minPrice} - $${maxPrice}`);

        console.log("\n🎉 Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
};

// Run the seeder
seedProducts();
