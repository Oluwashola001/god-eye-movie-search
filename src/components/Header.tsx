// Header component with logo and theme toggle
import React from 'react';
import { Eye, Film } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="relative z-10 bg-black/20 dark:bg-black/40 backdrop-blur-md border-b border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Eye className="w-8 h-8 text-amber-500" />
              <div className="absolute inset-0 w-8 h-8 text-amber-500 animate-pulse opacity-50">
                <Eye className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                God'seye
              </h1>
              <p className="text-xs text-amber-400 -mt-1">Movie Search</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#" 
              className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm font-medium"
            >
              Trending
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm font-medium"
            >
              Movies
            </a>
            <a 
              href="#" 
              className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-sm font-medium"
            >
              TV Shows
            </a>
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};