import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/axios/axios";

function Register() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [formData, setFormData] = useState({
    username: "",
    nickname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nicknameStatus, setNicknameStatus] = useState("");
  // "" | "checking" | "available" | "taken"

  const nicknameTimer = useRef(null);

  /* ================= INPUT CHANGE ================= */
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= NICKNAME CHECK (DEBOUNCE) ================= */
  const handleNicknameChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      nickname: value,
    }));

    setNicknameStatus("");

    if (nicknameTimer.current) {
      clearTimeout(nicknameTimer.current);
    }

    if (value.length < 3) return;

    nicknameTimer.current = setTimeout(async () => {
      try {
        setNicknameStatus("checking");

        const res = await api.get("/auth/check-nickname", {
          params: { nickname: value },
        });

        setNicknameStatus(res.data.available ? "available" : "taken");
      } catch (err) {
        setNicknameStatus("taken");
      }
    }, 500);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (nicknameStatus === "taken") {
      return setError("Nickname already taken");
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        username: formData.username,
        nickname: formData.nickname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      alert("Registered successfully!");
      navigate("/"); // login page
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

        {error && (
          <p className="text-red-600 text-center mb-3">{error}</p>
        )}

        {/* Username */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter username"
          />
        </div>

        {/* Nickname */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Nickname</label>
          <input
            type="text"
            name="nickname"
            required
            onChange={handleNicknameChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter nickname"
          />

          {nicknameStatus === "checking" && (
            <p className="text-sm text-gray-500 mt-1">
              Checking availability...
            </p>
          )}

          {nicknameStatus === "available" && (
            <p className="text-sm text-green-600 mt-1">
              ✔ Nickname available
            </p>
          )}

          {nicknameStatus === "taken" && (
            <p className="text-sm text-red-600 mt-1">
              ✖ Nickname already taken
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter email"
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter phone number"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter password"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Confirm password"
          />
        </div>

        <button
          type="submit"
          disabled={loading || nicknameStatus === "taken"}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
