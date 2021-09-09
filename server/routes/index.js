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
router.get("/api/users", userController.getUsers);

// POST ROUTES
/* router.param("postId", postController.getPostById);
 */
router.post(
  "/api/posts/new/:userId",
  authMiddleware,
  postController.addNewPost
);

router.get("/api/posts/feed/:userId", postController.getAllPosts);

router.put("/api/posts/like", postController.toggleLike);
router.put("/api/posts/unlike", postController.toggleLike);

module.exports = router;
