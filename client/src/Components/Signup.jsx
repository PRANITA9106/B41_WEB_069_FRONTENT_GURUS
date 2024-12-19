import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

import facebook from '../assets/facebook.svg'
import google from '../assets/google.svg'
import github from '../assets/github.svg'

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { themeMode } = useContext(ThemeContext)

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      setError("Please fill out all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password should be at least 8 characters.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://curd-movies-default-rtdb.firebaseio.com/signup.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Signup failed, please try again.");
      }

      const data = await response.json();
      console.log("Signup successful!", data);

      navigate("/login");

      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err) {
      setError("An error occurred. Please check your inputs.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    console.log("Signup with Google successful!");
    navigate("/login");
  };

  const handleFacebookSignup = () => {
    console.log("Signup with Facebook successful!");
    navigate("/login");
  };

  const handleGitHubSignup = () => {
    console.log("Signup with GitHub successful!");
    navigate("/login");
  };

  return (
    <div className={`${themeMode ? 'light' : 'dark'} flex justify-center items-center h-[90vh] `}>
      <div className="w-full max-w-sm p-8  rounded-lg shadow-2xl border">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${themeMode ? 'light' : 'dark'} w-full p-3 border border-gray-300 rounded-md`}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${themeMode ? 'light' : 'dark'} w-full p-3 border border-gray-300 rounded-md`}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${themeMode ? 'light' : 'dark'} w-full p-3 border border-gray-300 rounded-md`}
            />
          </div>

          <button
            type="submit"
            className="flex justify-self-center  rounded-md px-4 py-2 bg-gray-700 hover:bg-gray-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </form>

        <div className="mt-3 flex justify-center gap-6">
          <button
            onClick={handleGoogleSignup}
            className="border p-2 rounded-full"
          >
            <img width={28} src={google} alt='facebook' />
          </button>

          <button
            onClick={handleFacebookSignup}
            className="border p-2 rounded-full"
          >
            <img width={28} src={facebook} alt='facebook' />
          </button>

          <button
            onClick={handleGitHubSignup}
            className="border p-2 rounded-full"
          >
            <img width={28} src={github} alt="GitHub" />
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm">
            You have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};
