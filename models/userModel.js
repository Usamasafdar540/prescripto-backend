const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: Object, default: {line1:'',line2:''} },
  dob:{type:String,default:"Not Selected"},
  phone: { type: String, default: '00000000000' },
});

module.exports = mongoose.model("User",userSchema)
