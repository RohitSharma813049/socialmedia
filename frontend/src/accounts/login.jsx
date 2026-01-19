import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/axios/axios";
import { useDispatch } from "react-redux";
import { authActions } from "@/Redux/auth";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.emailOrPhone || !formData.password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const payload =
        /^\d+$/.test(formData.emailOrPhone)
          ? { phone: formData.emailOrPhone, password: formData.password }
          : { email: formData.emailOrPhone, password: formData.password };

      const res = await api.post("/auth/login", payload);

      // ✅ STORE USER IN REDUX
      dispatch(authActions.loginSuccess(res.data));

      navigate("/home");
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {error && (
          <p className="text-red-600 text-center mb-3">{error}</p>
        )}

        {/* Email or Phone */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email or Phone</label>
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Enter email or phone"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
