import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { token, setToken, setUser, user } = useAuth();
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  // Fermer le dropdown si on clique ailleurs
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdown(false);
      }
    }
    if (dropdown) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdown]);

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="font-bold text-xl">Facturer</div>
      <div className="relative flex items-center gap-2">
        <Link to="/" className="mr-4">Dashboard</Link>
        <Link to="/companies" className="mr-4">Entreprises</Link>
        {token && user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdown((d) => !d)}
              className="flex items-center gap-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
            >
              <span className="font-semibold">{user.username || 'Utilisateur'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow z-10">
                <div className="px-4 py-2 border-b">{user.role && user.role !== 'user' ? user.role : 'Utilisateur'}</div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">Connexion</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
