const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

const router = express.Router();

/* Error handler for async / await functions */
const catchErrors = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

// AUTH ROUTES
router.post(
  "/api/auth/register",
  authController.validateUserSignup,
  catchErrors(authController.registerNewUser)
);
router.post("/api/auth/login", authController.loginUser);

// USER ROUTES
router.get("/api/users", userController.getUsers);

// POST ROUTES
router.param("postId", postController.getPostById);

router.post(
  "/api/posts/new/:userId",
  authController.checkAuth,
  catchErrors(postController.addPost)
);

router.put(
  "/api/posts/like",
  authController.checkAuth,
  catchErrors(postController.toggleLike)
);

router.put(
  "/api/posts/unlike",
  authController.checkAuth,
  catchErrors(postController.toggleLike)
);

module.exports = router;
