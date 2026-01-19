import User from "../Schema/user.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= REGISTER ================= */
export const Register = async (req, res) => {
  try {
    const { username, nickname, email, phone, password } = req.body;

    // 1️⃣ Validate input
    if (!username || !nickname || (!email && !phone) || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // 2️⃣ Check email exists
    if (email) {
      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return res.status(409).json({
          message: "Email already exists"
        });
      }
    }

    // 3️⃣ Check phone exists
    if (phone) {
      const existPhone = await User.findOne({ phone });
      if (existPhone) {
        return res.status(409).json({
          message: "Phone already exists"
        });
      }
    }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const newUser = await User.create({
      username,
      nickname,
      email,
      phone,
      password: hashedPassword,
      loginMethod: email && phone ? "both" : email ? "email" : "phone"
    });

    // 6️⃣ Success response
    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error in Register"
    });
  }
};




export const checkNickname = async (req, res) => {
  try {
    const { nickname } = req.query;

    if (!nickname) {
      return res.status(400).json({
        available: false,
        message: "Nickname is required"
      });
    }

    const exists = await User.findOne({ nickname });

    if (exists) {
      return res.status(200).json({
        available: false,
        message: "Nickname already taken"
      });
    }

    return res.status(200).json({
      available: true,
      message: "Nickname available"
    });

  } catch (error) {
    return res.status(500).json({
      available: false,
      message: "Server error"
    });
  }
};




export const Login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if ((!email && !phone) || !password) {
      return res.status(400).json({
        message: "Email or phone and password are required"
      });
    }

    const user = await User.findOne(
      email ? { email } : { phone }
    );

    if (!user || !user.password) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not defined");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful"
    });

  } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    return res.status(500).json({
      message: error.message
    });
  }
};



export const Logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false // true in production (HTTPS)
    });

    return res.status(200).json({
      message: "Logout successful"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error in Logout"
    });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { q } = req.query;
    console.log("SEARCH QUERY:", q);

    const users = await User.find({
      nickname: { $regex: q, $options: "i" },
    });

    console.log("FOUND USERS:", users);

    res.json(users);
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({ message: "Search failed" });
  }
};



