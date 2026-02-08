"use client";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import styles from "./SearchBar.module.scss";
import { searchMulti, SearchResult } from "@/api/search/fetchSearch";
import SearchResults from "../searchResults/SearchResults";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const data = await searchMulti(searchQuery, 1);
      setResults(data);
      setShowResults(data.length > 0);
    } catch (error) {
      console.error("Error searching:", error);
      setResults([]);
      setShowResults(false);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for debounced search
    const timer = setTimeout(() => {
      performSearch(value);
    }, 300);

    setDebounceTimer(timer);
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  };

  const handleResultClick = () => {
    setShowResults(false);
    setQuery("");
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showResults]);

  return (
    <div className={styles.searchContainer} ref={searchContainerRef}>
      <div className={styles.searchBar}>
        <Search className={styles.searchIcon} size={24} />
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search for movies or TV shows..."
          className={`${styles.input} focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none`}
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            <X size={20} />
          </button>
        )}
        {isSearching && <div className={styles.loading}>Searching...</div>}
      </div>
      {showResults && results.length > 0 && (
        <SearchResults
          results={results}
          onResultClick={handleResultClick}
          query={query}
        />
      )}
    </div>
  );
};

export default SearchBar;
