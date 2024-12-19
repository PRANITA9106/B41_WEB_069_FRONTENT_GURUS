import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </form>

        <div className="mt-3 flex space-x-4 ml-10">
          <button
            onClick={handleGoogleSignup}
            className="bg-gray-800 text-white p-2 rounded-full"
          >
            <FaGoogle size={50} />
          </button>

          <button
            onClick={handleFacebookSignup}
            className="bg-gray-800 text-white p-2 rounded-full"
          >
            <FaFacebook size={50} />
          </button>

          <button
            onClick={handleGitHubSignup}
            className="bg-gray-800 text-white p-2 rounded-full"
          >
            <FaGithub size={50} />
          </button>
        </div>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
