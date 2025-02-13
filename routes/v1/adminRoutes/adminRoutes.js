const express = require("express");
const router = express.Router();

const adminController = require("../../../controller/admin/adminController");
const upload = require("../../../services/multer");
const adminAuth = require("../../../middlewares/authMiddleWare/adminAUth")
// const validator = require("../../../middlewares/tokenHandler/validateToken");
// const adminHandler = require("../../../middlewares/roleHandler/roles");
router.post(
  "/add-doctor",
  adminAuth,
  upload.singleUpload("image"),
  adminController.addDoctor
);
router.post(
  "/login",
  adminController.loginAdmin
);
// router.post(
//   "/deactivate/:id",
//   validator,
//   adminHandler,
//   adminController.deactivateUser
// );
// router.delete(
//   "/deleteuser/:id",
//   validator,
//   adminHandler,
//   adminController.deleteUser
// );

// router.patch(
//   "/updateuser/:id",
//   validator,
//   adminHandler,
//   adminController.updateUser
// );
module.exports = router;
