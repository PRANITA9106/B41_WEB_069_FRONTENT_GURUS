import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
