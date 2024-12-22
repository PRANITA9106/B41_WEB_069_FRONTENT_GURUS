import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
import facebook from '../assets/facebook.svg';
import google from '../assets/google.svg';
import github from '../assets/github.svg';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";


export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { themeMode } = useContext(ThemeContext);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      setError("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
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

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setEmail("");
      setPassword("");
      setUsername("");

      alert("Signup with Google successful!");
      navigate("/login");
    } catch (err) {
      setError("An error occurred during Google signup.");
      console.error(err);
    }
  };

  const handleFacebookSignup = async () => {
    const provider = new FacebookAuthProvider(); // Initialize Facebook provider
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Facebook Signup successful!", result);
      navigate("/login");
    } catch (error) {
      setError("Facebook Signup failed: " + error.message);
      console.error(error);
    }
  };

  const handleGitHubSignup = async () => {
    const provider = new GithubAuthProvider(); // Initialize GitHub provider
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("GitHub Signup successful!", result);
      navigate("/login");
    } catch (error) {
      setError("GitHub Signup failed: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className={`${themeMode ? 'light' : 'dark'} flex justify-center items-center h-[90vh]`}>
      <div className="w-full max-w-sm p-8 rounded-lg shadow-2xl border">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full p-3 border ${themeMode ? 'border-gray-300' : 'border-gray-600'} rounded-md`}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border ${themeMode ? 'border-gray-300' : 'border-gray-600'} rounded-md`}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border ${themeMode ? 'border-gray-300' : 'border-gray-600'} rounded-md`}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </form>

        <div className="mt-4 flex justify-center gap-6">
          <button
            onClick={handleGoogleSignup}
            className="border p-2 rounded-full"
          >
            <img width={28} src={google} alt="Google" />
          </button>

          <button
            onClick={handleFacebookSignup}
            className="border p-2 rounded-full"
          >
            <img width={28} src={facebook} alt="Facebook" />
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
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};
