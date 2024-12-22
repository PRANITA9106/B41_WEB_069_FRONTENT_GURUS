<<<<<<< HEAD
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
=======
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { themeMode } = useContext(ThemeContext)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    setIsSubmitting(true);

    try {

      const response = await fetch(
        `https://curd-movies-default-rtdb.firebaseio.com/signup.json`
      );


      if (!response.ok) {
        throw new Error("Unable to fatch data.");
      }

      const data = await response.json();


      const user = Object.values(data).find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert("Login successful!");
        navigate("/dashboard");
        setEmail("");
        setPassword("");
        setError("");
      } else {
        setError("Incorrect email or password.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
>>>>>>> Frontend_Gurus/Utkarsh
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className={`${themeMode ? "light" : "dark"} flex justify-center items-center  h-[90vh]`}>
      <div className="w-full max-w-sm p-8 rounded-lg shadow-2xl border">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
=======
    <div className={`${themeMode ? 'light' : 'dark'} flex justify-center items-center  h-[90vh] `}>
      <div className="w-full max-w-sm p-8  rounded-lg shadow-2xl border">
        <h2 className="text-3xl font-bold text-center mb-6 ">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4 ">
>>>>>>> Frontend_Gurus/Utkarsh
          <div>
            <input
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
              className={`${themeMode ? "light" : "dark"} w-full p-3 border border-gray-300 rounded-md`}
=======
              className={`${themeMode ? 'light' : 'dark'} w-full p-3 border border-gray-300 rounded-md`}
>>>>>>> Frontend_Gurus/Utkarsh
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="cdi#1w3ocn0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
              className={`${themeMode ? "light" : "dark"} w-full p-3 border border-gray-300 rounded-md`}
=======
              className={`${themeMode ? 'light' : 'dark'} w-full p-3 border border-gray-300 rounded-md`}
>>>>>>> Frontend_Gurus/Utkarsh
              required
            />
          </div>
          <button
            type="submit"
<<<<<<< HEAD
            className="flex justify-self-center rounded-md px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white"
=======
            className=" flex justify-self-center  rounded-md px-4 py-2 bg-gray-700 hover:bg-gray-600"
>>>>>>> Frontend_Gurus/Utkarsh
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
<<<<<<< HEAD
=======

>>>>>>> Frontend_Gurus/Utkarsh
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
<<<<<<< HEAD
=======

export default Login;
>>>>>>> Frontend_Gurus/Utkarsh
