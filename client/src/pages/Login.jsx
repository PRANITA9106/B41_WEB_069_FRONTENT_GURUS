// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(''); // Add error state
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Clear any previous error
//     setError('');

//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', {
//         email,
//         password,
//       });

//       // Assuming the token is in response.data.token
//       const token = response.data.token;

//       if (token) {
//         // Store token in localStorage
//         localStorage.setItem('token', token);
//         navigate('/dashboard'); // Redirect to dashboard
//       } else {
//         setError('Incorrect email or password.');
//       }
//     } catch (err) {
//       // Set error message if login fails
//       setError('An error occurred. Please try again later.');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>

//         <label className="block text-sm font-medium mb-1">Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded mb-4"
//           placeholder="Enter your email"
//           required
//         />

//         <label className="block text-sm font-medium mb-1">Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded mb-4"
//           placeholder="Enter your password"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600"
//         >
//           Log In
//         </button>

//         {error && <p className="mt-4 text-red-500 text-center">{error}</p>} {/* Show error message */}

//       </form>
//     </div>
//   );
// };

// export default Login;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      
      navigate('/taskboard'); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const token = response.data.token;

      if (token) {
        localStorage.setItem('token', token);
        // navigate('/taskboard');
        window.location.href = '/' // navget home page
      } else {
        setError('Incorrect email or password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your email"
          required
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your password"
          required   
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-400"
        >
          Log In
        </button>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>} {/* Show error message */}
      </form>
    </div>
  );
};

export default Login;
