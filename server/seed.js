import dotenv from "dotenv";
import connectDB from "./config/db.js";
import mongoose from "mongoose";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

dotenv.config();

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
    role: "user",
  },
];

const products = [
  {
    name: "Wireless Headphones",
    description:
      "Over-ear Bluetooth headphones with active noise cancellation and 30-hour battery life.",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Smart Watch",
    description:
      "Fitness tracking smart watch with heart-rate monitor, GPS and water resistance.",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    category: "Electronics",
    stock: 40,
  },
  {
    name: "Running Shoes",
    description:
      "Lightweight breathable running shoes with cushioned soles for all-day comfort.",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    category: "Footwear",
    stock: 60,
  },
  {
    name: "Leather Backpack",
    description:
      "Premium handcrafted leather backpack with laptop compartment and multiple pockets.",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    category: "Accessories",
    stock: 15,
  },
  {
    name: "Coffee Maker",
    description:
      "Programmable drip coffee maker with 12-cup capacity and auto shut-off.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&q=80",
    category: "Home",
    stock: 30,
  },
  {
    name: "Mechanical Keyboard",
    description:
      "RGB backlit mechanical keyboard with tactile switches and detachable USB-C cable.",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    category: "Electronics",
    stock: 50,
  },
  {
    name: "Sunglasses",
    description:
      "Polarized UV400 sunglasses with lightweight frame and classic design.",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    category: "Accessories",
    stock: 80,
  },
  {
    name: "Desk Lamp",
    description:
      "LED desk lamp with adjustable brightness, color temperature and USB charging port.",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    category: "Home",
    stock: 45,
  },
];

const importData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // create() triggers the pre-save hook so passwords get hashed.
    await User.create(users);
    await Product.create(products);

    console.log("Sample data imported successfully.");
    console.log("Admin login -> admin@example.com / admin123");
    console.log("User login  -> john@example.com / john123");
    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("All data destroyed.");
    process.exit(0);
  } catch (error) {
    console.error(`Destroy error: ${error.message}`);
    process.exit(1);
  }
};

// Run with: node seed.js   (import)  |  node seed.js -d  (destroy)
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
