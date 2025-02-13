const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sendError = require("../../util/sendError");

const adminAuth = asyncHandler(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, 403, "Admin access denied. No token provided.");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== "admin") {
      return sendError(res, 401, "Unauthorized: Admin access only.");
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return sendError(res, 401, "Invalid or expired token.", error.message);
  }
});

module.exports = adminAuth;
