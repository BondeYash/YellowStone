import React, { useState , useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context.jsx';
import logo from '../assets/logo.png'; 
import axios from '../../.config/axios'; // Import axios for making HTTP requests

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext);


  const handleLogin = (e) =>  {
    e.preventDefault();
    try {
        const response = axios.post('/users/login', {
            email,
            password
        }).then((response)=> {
            localStorage.setItem('token' , response.data.token); 
            setUser(response.data.user); // Set user in context

            navigate('/');
        });
        console.log('Login successful:', response.data);
    }catch (error) {
        console.error('Login failed:', error);
    }

  }

  return (
    <div className=" bg-black text-white flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-600 rounded-lg shadow-md shadow-gray-600 ">
        <img src={logo} alt="Logo" className="mx-auto h-40 border-8 border-gray-700 rounded-full" />
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md font-semibold transition duration-200"
              onClick={() => handleLogin}
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-400 mt-6">
                Don't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
