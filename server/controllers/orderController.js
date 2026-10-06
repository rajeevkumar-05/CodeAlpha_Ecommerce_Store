import Order from "../models/Order.js";
import Product from "../models/Product.js";

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req, res, next) => {
  try {
    const { products, shippingAddress } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }
    if (!shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // Build order items from the database to trust server-side prices.
    const orderItems = [];
    let totalAmount = 0;

    for (const item of products) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.product}` });
      }

      const quantity = Number(item.quantity) || 1;
      if (dbProduct.stock < quantity) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${dbProduct.name}` });
      }

      orderItems.push({
        product: dbProduct._id,
        name: dbProduct.name,
        price: dbProduct.price,
        quantity,
        image: dbProduct.image,
      });

      totalAmount += dbProduct.price * quantity;

      // Decrement stock
      dbProduct.stock -= quantity;
      await dbProduct.save();
    }

    const order = await Order.create({
      user: req.user._id,
      products: orderItems,
      totalAmount: Math.round(totalAmount * 100) / 100,
      shippingAddress,
    });

    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get orders for the logged-in user
 * @route   GET /api/orders/my-orders
 * @access  Private
 */
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private/Admin
 */
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update order status
 * @route   PUT /api/orders/:id/status
 * @access  Private/Admin
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status || order.status;
    const updated = await order.save();
    return res.json(updated);
  } catch (error) {
    next(error);
  }
};
