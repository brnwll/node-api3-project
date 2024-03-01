const express = require("express");

const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Users.get()
    .then((users) => res.status(200).json(users))
    .catch(() => res.status(500).json({ message: "Error retrieving users" }));
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res) => {
  Users.insert(req.body)
    .then((user) => res.status(201).json(user))
    .catch(() => res.status(500).json({ message: "Error creating user" }));
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  Users.update(req.params.id, req.body)
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(500).json({ message: "Error updating user" }));
});

router.delete("/:id", validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(() => res.status(200).json(req.user))
    .catch(() => res.status(500).json({ message: "Error deleting user" }));
});

router.get("/:id/posts", validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => res.status(200).json(posts))
    .catch(() => res.status(500).json({ message: "Error retrieving posts" }));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then((post) => res.status(201).json(post))
    .catch(() => res.status(500).json({ message: "Error creating post" }));
});

module.exports = router;
