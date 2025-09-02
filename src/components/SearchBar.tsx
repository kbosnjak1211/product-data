"use client";

import { useState, useCallback } from "react";
import { debounce } from "../utils/debounce";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  placeholder = "Search products...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      onSearch(searchQuery);
    }, 300),
    [onSearch]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm transition-all"
        placeholder={placeholder}
        aria-label="Search products"
      />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Clear search"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
