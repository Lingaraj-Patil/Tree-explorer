import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TreePine, User, Trophy, BookOpen, Home, MapPin } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/stories', label: 'Stories', icon: BookOpen },
    { path: '/map', label: 'Map', icon: MapPin },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg group-hover:scale-105 transition-transform">
              <TreePine className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              TreeExplorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                  isActive(path)
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-16 bg-white border-t shadow-lg">
            <nav className="py-4">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center space-x-3 px-6 py-3 transition-all ${
                    isActive(path)
                      ? 'bg-green-100 text-green-700 font-medium border-r-4 border-green-500'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
