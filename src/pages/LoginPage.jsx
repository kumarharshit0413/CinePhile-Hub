import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
        } catch (error) {
        console.error("Error logging in:", error);
        alert(error.message);
        }
    };

  return (
    <div className="flex justify-center items-center h-screen p-2">
      <form onSubmit={handleLogin} className="bg-gray-800 p-10 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>

         <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-4 mb-4 bg-gray-400 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-4 mb-4 bg-gray-400 rounded"
        />
        <button type="submit" className="w-full bg-red-600 p-2 rounded">Log In</button>
        <p className="text-center text-white mt-4">
          Don't have an account? <Link to="/signup" className="text-red-500">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;