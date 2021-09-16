const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authentication.middleware");
const router = express.Router();

// AUTH ROUTES
router.post("/api/register", authController.registerNewUser);
router.post("/api/login", authController.loginUser);

// USER ROUTES
router.get("/api/users/all", userController.fetchAllUsers);

// POST ROUTES
router.post(
  "/api/posts/new/:userId",
  authMiddleware,
  postController.addNewPost
);

router.get("/api/posts/feed", postController.getAllPosts);
router.put("/api/posts/like", authMiddleware, postController.toggleLike);
router.put("/api/posts/unlike", authMiddleware, postController.toggleLike);

module.exports = router;
