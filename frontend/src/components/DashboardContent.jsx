import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/userSlice";
import { fetchMyOrders } from "../store/slices/ordersSlice";
import { authAPI, ordersAPI } from "../services/api";
import Header from "./Header";
import Footer from "./Footer";

// Icons component for consistent icon usage
const Icons = {
    User: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 21a8 8 0 0 0-16 0" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    ),
    Package: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    MapPin: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Calendar: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
    Settings: (props) => (
        <svg
            {...props}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
    ),
};

// Card components
const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = "" }) => (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
        {children}
    </div>
);

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
        {children}
    </h3>
);

const CardDescription = ({ children, className = "" }) => (
    <p className={`text-sm text-gray-600 mt-1 ${className}`}>
        {children}
    </p>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

// Button component
const Button = ({ children, variant = "default", size = "default", className = "", onClick, type = "button" }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        default: "bg-purple-700 text-white hover:bg-purple-800 focus:ring-purple-500",
        outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-purple-500",
        destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    const sizes = {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
    };

    return (
        <button
            type={type}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

// Input component
const Input = ({ className = "", ...props }) => (
    <input
        className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${className}`}
        {...props}
    />
);

// Label component
const Label = ({ children, htmlFor, className = "" }) => (
    <label
        htmlFor={htmlFor}
        className={`text-sm font-medium text-gray-700 ${className}`}
    >
        {children}
    </label>
);

// Badge component
const Badge = ({ children, className = "" }) => (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
        {children}
    </span>
);

// Tabs components
const Tabs = ({ defaultValue, children, className = "" }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <div className={`space-y-6 ${className}`}>
            {React.Children.map(children, child => {
                if (child.type === TabsList) {
                    return React.cloneElement(child, { activeTab, setActiveTab });
                } else if (child.type === TabsContent) {
                    return React.cloneElement(child, { activeTab, setActiveTab });
                }
                return child;
            })}
        </div>
    );
};

const TabsList = ({ children, className = "" }) => (
    <div className={`flex space-x-1 rounded-lg bg-gray-100 p-1 ${className}`}>
        {children}
    </div>
);

const TabsTrigger = ({ value, children, activeTab, setActiveTab, className = "" }) => (
    <button
        className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${activeTab === value
            ? "bg-white text-purple-700 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
            } ${className}`}
        onClick={() => setActiveTab(value)}
    >
        {children}
    </button>
);

const TabsContent = ({ value, children, activeTab }) => {
    if (activeTab !== value) return null;
    return <div className="mt-6">{children}</div>;
};

export default function DashboardContent() {
    const { user } = useSelector((state) => state.user);
    const ordersState = useSelector((state) => state.orders);
    const orders = ordersState?.list || [];
    const loading = ordersState?.loading || false;

    console.log('Full orders state:', ordersState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        address: {
            street: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
        },
    });

    useEffect(() => {
        fetchProfile();
        dispatch(fetchMyOrders());
    }, [dispatch]);

    // Debug logging
    console.log('Orders data:', orders);
    console.log('Loading state:', loading);

    const fetchProfile = async () => {
        try {
            const response = await authAPI.getProfile();
            const userData = response.data;
            setProfileData({
                name: userData.name,
                email: userData.email,
                phone: userData.phone || "",
                address: userData.address || {
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country: "",
                },
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await authAPI.updateProfile(profileData);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="font-serif text-3xl font-bold mb-2 text-gray-900">My Dashboard</h1>
                            <p className="text-gray-600">Manage your account and view your orders</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="flex items-center gap-2"
                        >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16,17 21,12 16,7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="profile">
                    <TabsList>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="orders">Order History</TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Icons.User className="h-5 w-5" />
                                    Profile Information
                                </CardTitle>
                                <CardDescription>Update your personal information and address</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={profileData.phone}
                                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="font-semibold flex items-center gap-2 text-gray-900">
                                            <Icons.MapPin className="h-4 w-4" />
                                            Address Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="street">Street Address</Label>
                                                <Input
                                                    id="street"
                                                    value={profileData.address.street}
                                                    onChange={(e) =>
                                                        setProfileData({
                                                            ...profileData,
                                                            address: { ...profileData.address, street: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="city">City</Label>
                                                <Input
                                                    id="city"
                                                    value={profileData.address.city}
                                                    onChange={(e) =>
                                                        setProfileData({
                                                            ...profileData,
                                                            address: { ...profileData.address, city: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="state">State</Label>
                                                <Input
                                                    id="state"
                                                    value={profileData.address.state}
                                                    onChange={(e) =>
                                                        setProfileData({
                                                            ...profileData,
                                                            address: { ...profileData.address, state: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="zipCode">ZIP Code</Label>
                                                <Input
                                                    id="zipCode"
                                                    value={profileData.address.zipCode}
                                                    onChange={(e) =>
                                                        setProfileData({
                                                            ...profileData,
                                                            address: { ...profileData.address, zipCode: e.target.value },
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button type="submit">Update Profile</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="orders">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Icons.Package className="h-5 w-5" />
                                    Order History
                                </CardTitle>
                                <CardDescription>View and track your recent orders</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {loading ? (
                                    <div className="text-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700 mx-auto"></div>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Icons.Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600">No orders found</p>
                                        <Button className="mt-4" onClick={() => navigate("/products")}>
                                            Start Shopping
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Order ID
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Date
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Items
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Payment
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Total
                                                    </th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {orders.map((order) => (
                                                    <tr key={order._id} className="hover:bg-gray-50">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            #{order._id.slice(-8)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <div className="flex items-center space-x-2">
                                                                <div className="flex -space-x-1">
                                                                    {order.orderItems.slice(0, 3).map((item, index) => (
                                                                        <img
                                                                            key={index}
                                                                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                                                                            src={item.image || "/placeholder.svg"}
                                                                            alt={item.name}
                                                                        />
                                                                    ))}
                                                                    {order.orderItems.length > 3 && (
                                                                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 text-xs font-medium text-gray-600">
                                                                            +{order.orderItems.length - 3}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                <span className="text-xs text-gray-500">
                                                                    {order.orderItems.length} item{order.orderItems.length !== 1 ? 's' : ''}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <Badge className={order.isDelivered ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                                                {order.isDelivered ? "Delivered" : "Processing"}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {order.isPaid ? (
                                                                <Badge className="bg-green-100 text-green-800">Paid</Badge>
                                                            ) : (
                                                                <Badge className="bg-red-100 text-red-800">Pending</Badge>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                            ${order.totalPrice}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <Button variant="outline" size="sm">
                                                                View Details
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </main>
        </div>
    );
}
