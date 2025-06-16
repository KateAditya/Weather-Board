import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LocationSearchProps {
  onLocationChange: (location: string) => void;
}

export const LocationSearch = ({ onLocationChange }: LocationSearchProps) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (searchValue.trim()) {
      onLocationChange(searchValue.trim());
      setSearchValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocoding to get city name
            const response = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
            );
            const data = await response.json();
            if (data && data[0]) {
              onLocationChange(data[0].name);
            }
          } catch (error) {
            console.error('Error getting location name:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please check your GPS settings.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  };

  return (
    <Card className="p-4 mb-6 bg-white/10 backdrop-blur-md border-white/20">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
        </div>
        <Button
          onClick={handleSearch}
          className="bg-white/20 hover:bg-white/30 border-white/20"
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button
          onClick={handleGetCurrentLocation}
          className="bg-white/20 hover:bg-white/30 border-white/20"
          title="Get current location"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
