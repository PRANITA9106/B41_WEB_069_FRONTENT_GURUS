import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";
<<<<<<< HEAD
import facebook from "../assets/facebook.svg";
import google from "../assets/google.svg";
import github from "../assets/github.svg";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
=======

import facebook from '../assets/facebook.svg'
import google from '../assets/google.svg'
import github from '../assets/github.svg'
>>>>>>> Frontend_Gurus/Utkarsh

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
<<<<<<< HEAD
  const { themeMode } = useContext(ThemeContext);

  const validateInput = () => {
    if (!username || !email || !password) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format.";
    }
    if (password.length < 8) {
      return "Password should be at least 8 characters.";
    }
    return "";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
=======

  const { themeMode } = useContext(ThemeContext)

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !username) {
      setError("Please fill out all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password should be at least 8 characters.");
>>>>>>> Frontend_Gurus/Utkarsh
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
<<<<<<< HEAD
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: username });
      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
=======
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
>>>>>>> Frontend_Gurus/Utkarsh
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

<<<<<<< HEAD
  const handleThirdPartySignup = async (providerInstance, providerName) => {
    try {
      const result = await signInWithPopup(auth, providerInstance);
      console.log(`${providerName} Signup successful!`, result);
      alert(`${providerName} Signup successful!`);
      navigate("/login");
    } catch (err) {
      setError(`${providerName} Signup failed: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <div className={`${themeMode ? "light" : "dark"} flex justify-center items-center h-[90vh]`}>
      <div className="w-full max-w-sm p-8 rounded-lg shadow-2xl border">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`w-full p-3 border ${themeMode ? "border-gray-300" : "border-gray-600"} rounded-md`}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 border ${themeMode ? "border-gray-300" : "border-gray-600"} rounded-md`}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 border ${themeMode ? "border-gray-300" : "border-gray-600"} rounded-md`}
          />
          <button
            type="submit"
            className="w-full rounded-md px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white"
=======
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
>>>>>>> Frontend_Gurus/Utkarsh
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </form>

<<<<<<< HEAD
        <div className="mt-4 flex justify-center gap-6">
          <button
            onClick={() => handleThirdPartySignup(new GoogleAuthProvider(), "Google")}
            className="border p-2 rounded-full"
          >
            <img width={28} src={google} alt="Google" />
          </button>
          <button
            onClick={() => handleThirdPartySignup(new FacebookAuthProvider(), "Facebook")}
            className="border p-2 rounded-full"
          >
            <img width={28} src={facebook} alt="Facebook" />
          </button>
          <button
            onClick={() => handleThirdPartySignup(new GithubAuthProvider(), "GitHub")}
=======
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
>>>>>>> Frontend_Gurus/Utkarsh
            className="border p-2 rounded-full"
          >
            <img width={28} src={github} alt="GitHub" />
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm">
<<<<<<< HEAD
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
=======
            You have an account?{" "}
            <Link to="/sign-in" className="text-blue-500 hover:text-blue-600">
>>>>>>> Frontend_Gurus/Utkarsh
              Login
            </Link>
          </p>
        </div>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};
