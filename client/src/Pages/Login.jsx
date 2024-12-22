import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils.js/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await loginUser(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${themeMode ? "light" : "dark"} flex justify-center items-center  h-[90vh]`}>
      <div className="w-full max-w-sm p-8 rounded-lg shadow-2xl border">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${themeMode ? "light" : "dark"} w-full p-3 border border-gray-300 rounded-md`}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="cdi#1w3ocn0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${themeMode ? "light" : "dark"} w-full p-3 border border-gray-300 rounded-md`}
              required
            />
          </div>
          <button
            type="submit"
            className="flex justify-self-center rounded-md px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-blue-500 hover:text-blue-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
