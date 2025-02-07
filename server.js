const express = require("express");
const morgan = require("morgan");
const dotEnv = require("dotenv").config();
const cors = require("cors");
const { connectCloudinary, cloudinaryUploadImg, cloudinaryDeleteImg } = require("./services/cloudinary");
const multer = require("multer");
// const errorHandler = require("./middlewares/errorHandler/errors");
const dbConnect = require("./config/dbConnection");
const route = require("./routes/routes");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
dbConnect();
connectCloudinary();
const bodyParser = require("body-parser");
// const route = require("./routes/route");
const port = process.env.PORT || 4000;
// require("./config/db");
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", route);
// app.use(errorHandler);
// app.use("/", (req, res) => {
//   res.send("Hello From The Serve Side");
// });
app.listen(port, () => {
  console.log(`listening to the ${port}`);
});
