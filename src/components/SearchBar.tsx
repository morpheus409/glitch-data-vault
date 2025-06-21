
import React from 'react';
import { Search, Zap } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm, 
  onSearchChange, 
  placeholder = "Search database..." 
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-cyber-green/50" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="cyber-input w-full pl-10 pr-12 py-3 rounded-md font-mono placeholder:font-mono focus:outline-none"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
        <Zap className="h-4 w-4 text-cyber-cyan animate-neon-pulse" />
      </div>
      {searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-cyber-green/70 font-mono">
          SCANNING DATABASE... {searchTerm.length > 0 && `[${searchTerm.length} CHARS]`}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
