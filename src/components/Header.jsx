import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { currentUser, userProfile, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false); // Close menu on logout
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${query}`);
      setQuery("");
      setIsMenuOpen(false); // Close menu on search
    }
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="">
        <div className='flex justify-between items-center px-9 py-4'>
          {/* Logo/Title */}
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
              Cinephile Hub
            </h1>
          </Link>

          {/* Desktop Menu & Search */}
          <div className="hidden md:flex items-center gap-8">
            <form onSubmit={handleSearch} className='flex items-center gap-2'>
              <input
                className='bg-gray-700 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-red-500'
                type='text'
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button type="submit" className="bg-red-600 p-2 rounded">Search</button>
            </form>
            {currentUser && userProfile ? (
              <>
                <Link to="/watchlist" className="font-bold hover:text-red-500 whitespace-nowrap">My Watchlist</Link>
                <span className="text-gray-300 font-bold whitespace-nowrap">Welcome, {userProfile.username || currentUser.email}</span>
                <button onClick={handleLogout} className="bg-red-600 p-2 rounded ml-auto">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-bold hover:text-red-500">Log In</Link>
                <Link to="/signup" className="bg-red-600 p-2 rounded">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                // Close Icon (X)
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                // Hamburger Icon
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-4">
          <form onSubmit={handleSearch} className='flex items-center gap-2'>
            <input
              className='bg-gray-700 text-white rounded p-2 focus:outline-none w-full'
              type='text'
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="bg-red-600 p-2 rounded">Search</button>
          </form>
          {currentUser && userProfile ? (
            <div className="flex flex-col items-start gap-4">
              <span className="text-gray-300 font-bold">Welcome, {userProfile.username || currentUser.email}</span>
              <Link to="/watchlist" onClick={() => setIsMenuOpen(false)} className="font-bold hover:text-red-500">My Watchlist</Link>
              <button onClick={handleLogout} className="bg-red-600 p-2 rounded w-full">Logout</button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="font-bold hover:text-red-500 text-center bg-gray-700 p-2 rounded">Log In</Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="bg-red-600 text-white font-bold p-2 rounded text-center">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;