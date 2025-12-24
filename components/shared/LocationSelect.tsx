'use client';

import { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, X, Loader2 } from 'lucide-react';

interface LocationSelectProps {
  value: string;
  onChange: (value: string) => void;
}

interface LocationSuggestion {
  display_name: string;
  place_id: number;
}

export default function LocationSelect({ value, onChange }: LocationSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch location suggestions from OpenStreetMap Nominatim API
  const fetchLocationSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Using OpenStreetMap Nominatim API (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'LetsHang/1.0', // Required by Nominatim
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }

      const data: LocationSuggestion[] = await response.json();
      setSuggestions(data);
    } catch (err) {
      setError('Failed to load locations');
      setSuggestions([]);
      console.error('Error fetching location suggestions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search to avoid too many API calls
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchLocationSuggestions(searchQuery);
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (location: LocationSuggestion) => {
    onChange(location.display_name);
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchQuery('');
  };

  return (
    <div className="relative" ref={containerRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-4 cursor-pointer transition-all duration-200"
      >
        <MapPin size={22} className="text-white/50 flex-shrink-0" />
        {value ? (
          <div className="flex-1 flex items-center justify-between gap-2">
            <span className="text-white text-base truncate">{value}</span>
            <button
              onClick={handleClear}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <X size={14} className="text-white/60" />
            </button>
          </div>
        ) : (
          <input
            type="text"
            placeholder="Location"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="flex-1 bg-transparent text-white placeholder-white/50 focus:outline-none text-base"
          />
        )}
        <ChevronDown
          size={20}
          className={`text-white/50 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 material-ultrathin rounded-2xl shadow-2xl z-[9999] max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="px-5 py-4 flex items-center justify-center gap-2">
              <Loader2 size={18} className="text-white/50 animate-spin" />
              <span className="text-white/50 text-sm">Searching locations...</span>
            </div>
          ) : error ? (
            <div className="px-5 py-4 text-white/50 text-sm text-center">
              {error}
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((location) => (
                <button
                  key={location.place_id}
                  onClick={() => handleSelect(location)}
                  className="w-full px-5 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3 group"
                >
                  <MapPin size={18} className="text-white/40 group-hover:text-white/60 transition-colors flex-shrink-0" />
                  <span className="text-white text-base group-hover:text-white/90 transition-colors truncate">
                    {location.display_name}
                  </span>
                </button>
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="px-5 py-4 text-white/50 text-sm text-center">
              No locations found
            </div>
          ) : (
            <div className="px-5 py-4 text-white/50 text-sm text-center">
              Start typing to search for locations
            </div>
          )}
        </div>
      )}
    </div>
  );
}

