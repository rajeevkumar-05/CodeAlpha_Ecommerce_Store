import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  toggleWishlist,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.post("/wishlist", protect, toggleWishlist);
router.post("/wishlist/:productId", protect, toggleWishlist);
router.put("/wishlist", protect, toggleWishlist);

export default router;
