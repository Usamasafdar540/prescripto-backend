const express = require("express");
const router = express.Router();

// const userRoutes = require("../routes/v1/users/userRoutes");
const adminRoutes = require("../routes/v1/adminRoutes/adminRoutes");

// router.use("/users", userRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
