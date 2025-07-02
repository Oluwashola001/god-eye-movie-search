// Search bar component with real-time search and elegant styling
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Film } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  loading?: boolean;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onClear,
  loading = false,
  placeholder = "Search for movies, TV shows, or keywords..."
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onClear();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  // Focus search bar on '/' key press
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isFocused) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isFocused]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`
        relative flex items-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm 
        border border-gray-300/20 dark:border-gray-700/50 rounded-2xl 
        transition-all duration-300 ease-out
        ${isFocused 
          ? 'ring-2 ring-amber-500/50 border-amber-500/50 shadow-lg shadow-amber-500/10' 
          : 'hover:border-gray-300/40 dark:hover:border-gray-600/50'
        }
      `}>
        <div className="flex items-center pl-4 pr-2">
          <Film className="w-5 h-5 text-amber-500 mr-3" />
          <Search className={`w-5 h-5 transition-colors duration-200 ${
            isFocused ? 'text-amber-500' : 'text-gray-400 dark:text-gray-500'
          }`} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            flex-1 px-4 py-4 bg-transparent text-gray-900 dark:text-white 
            placeholder-gray-500 dark:placeholder-gray-400 
            focus:outline-none text-lg
          "
          disabled={loading}
        />

        {query && (
          <button
            onClick={handleClear}
            className="
              p-2 mr-2 rounded-full hover:bg-gray-200/20 dark:hover:bg-gray-700/50 
              transition-colors duration-200 group
            "
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </button>
        )}

        {loading && (
          <div className="pr-4">
            <div className="w-5 h-5 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Search hint */}
      {!isFocused && !query && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500 pointer-events-none">
          Press <kbd className="px-2 py-1 bg-gray-200/20 dark:bg-gray-700/50 rounded text-xs">/</kbd> to search
        </div>
      )}
    </div>
  );
};