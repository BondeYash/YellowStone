import React, { useState , useContext } from 'react';
import logo from '../assets/logo.png';
import axios from '../../.config/axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/user.context.jsx';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/register', {
        email,
        password,
        name,
        roomName,
      }).then((response) => {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        navigate('/');
      });
      console.log('Registration successful:', response.data);
      // Optionally redirect or notify user
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="bg-[#0d1117] text-white min-h-[100vh] flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-lg p-10 bg-[#161b22] rounded-2xl shadow-lg border border-gray-700">
        <div className="flex flex-col items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-28 h-28 rounded-full border-4 border-gray-700 mb-4"
          />
          <h2 className="text-2xl font-bold mb-6 text-gray-200">Create Account</h2>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm mb-1 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#0d1117] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="room_name" className="block text-sm mb-1 text-gray-300">
              Room Name
            </label>
            <input
              type="text"
              id="room_name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#0d1117] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1 text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#0d1117] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1 text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 bg-[#0d1117] text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
