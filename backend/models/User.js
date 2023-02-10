const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserScheme = new mongoose.Schema(
   {
      username: {
         type: String,
         required: [true, "Please provide username"],
         unique: true,
      },
      password: {
         type: String,
         required: [true, "Please provide password"],
         minLength: 6,
      },
      email: {
         type: String,
         required: [true, "Please provide email"],
         validate: {
            validator: validator.isEmail,
            message: "Please provide valid email",
         },
         minLength: 6,
         unique: true,
      },
      avatar: {
         type: String,
         required: [true, "Please provide avatar"],
      },
      admin: {
         type: Boolean,
         default: false,
      },
      lofiUsername: {
         type: String,
         required: [true, "Please provide your nickname"],
      },
      verified: {
         type: Boolean,
         default: false,
      },
      profile: {
         wallpaper: {
            type: String,
            default: "c5630f2b69d4c3d762d3aab8716f68e1.jpg",
         },
         gender: {
            type: String,
            default: "Other",
         },
         location: {
            type: String,
            default: "",
         },
         birthdate: {
            type: String,
            default: "",
         },
         facebook: {
            type: String,
            default: "",
         },
         twitter: {
            type: String,
            default: "",
         },
         phone: {
            type: String,
            default: "",
         },
      },
   },
   {
      timestamps: true,
   }
);

UserScheme.pre("save", async function (next) {
   const salt = await bcrypt.genSalt(10);
   const hashed = await bcrypt.hash(this.password, salt);
   this.password = hashed;
   next();
});

module.exports = mongoose.model("user", UserScheme);
