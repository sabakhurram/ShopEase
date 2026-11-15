
const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
// Get orders belonging to the logged-in customer
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to retrieve your orders.",
    });
  }
});
// Create a new order
router.post("/", protect, async (req, res) => {
  try {
    const {
      customer,
      shippingAddress,
      items,
      paymentMethod = "COD",
    } = req.body;

    // Validate customer information
    if (
      !customer?.name?.trim() ||
      !customer?.email?.trim() ||
      !customer?.phone?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide complete customer information.",
      });
    }

    // Validate shipping information
    if (
      !shippingAddress?.address?.trim() ||
      !shippingAddress?.city?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a complete shipping address.",
      });
    }

    // Validate order items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty.",
      });
    }

    if (paymentMethod !== "COD") {
      return res.status(400).json({
        success: false,
        message: "Currently, only Cash on Delivery is supported.",
      });
    }

    // Validate product IDs and quantities
    for (const item of items) {
      if (
        !mongoose.isValidObjectId(item.productId) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid product or quantity.",
        });
      }
    }

    // Fetch actual products from MongoDB
    const productIds = items.map((item) => item.productId);

    const products = await Product.find({
      _id: { $in: productIds },
    });

    if (products.length !== items.length) {
      return res.status(400).json({
        success: false,
        message: "One or more products could not be found.",
      });
    }

    // Build order items using trusted database information
    let subtotal = 0;

    const orderItems = items.map((item) => {
      const product = products.find(
        (product) => product._id.toString() === item.productId
      );

      if (product.stock < item.quantity) {
        throw new Error(`${product.name} does not have enough stock.`);
      }

      const price = product.price;

      subtotal += price * item.quantity;

      return {
        product: product._id,
        name: product.name,
        image: product.images?.[0] || "",
        price,
        quantity: item.quantity,
        color: item.color || "",
        size: item.size || "",
      };
    });

    // Calculate delivery fee on the backend
    const shippingFee = 0;
    const total = subtotal + shippingFee;

    // Save the order
   const order = await Order.create({
  user: req.user.id,
      customer,
      shippingAddress,
      items: orderItems,
      subtotal,
      shippingFee,
      total,
      paymentMethod,
    });

    res.status(201).json({
      success: true,
      message: "Your order has been placed successfully!",
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Unable to place your order.",
    });
  }
});

module.exports = router;
