const express = require("express");
const router = express.Router();

const adminController = require("../../../controller/admin/adminController");
const upload = require("../../../services/multer");

// const validator = require("../../../middlewares/tokenHandler/validateToken");
// const adminHandler = require("../../../middlewares/roleHandler/roles");
router.post(
  "/add-doctor",
  upload.singleUpload("image"),
  adminController.addDoctor
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
