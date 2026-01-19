import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    /* ===== BASIC INFO ===== */
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    nickname: {
      type: String,
      required: true,
      trim: true
    },

    bio: {
      type: String,
      maxLength: 150,
      default: ""
    },

    profilePic: {
      type: String, // image URL (cloudinary, s3, etc.)
      default: ""
    },

    /* ===== LOGIN ===== */
    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true
    },

    phone: {
      type: Number,
      unique: true,
      sparse: true
    },

    password: {
      type: String // for email login
    },

    otp: Number,
    otpExpired: Date,

    loginMethod: {
      type: String,
      enum: ["email", "phone", "both"],
      default: "phone"
    },

    /* ===== ONLINE STATUS ===== */
    isOnline: {
      type: Boolean,
      default: false
    },

    lastSeen: {
      type: Date
    },

    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
