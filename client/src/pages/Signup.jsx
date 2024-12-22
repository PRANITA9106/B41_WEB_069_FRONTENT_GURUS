import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); 

 
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); 

    try {
      
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      
      alert('Signup Successful!');
      navigate('/login'); 
    } catch (err) {
      
      setError('Something went wrong, please try again!');
      console.error(err);
    } finally {
      setIsSubmitting(false); 
    }
  };

  

  return (
    <div className="flex justify-center items-center h-[90vh]">
      
      <div className="w-full max-w-sm p-8 rounded-lg shadow-2xl border">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

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
            className="w-full rounded-md px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Signup"}
          </button>
        </form>


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

export default Signup;
