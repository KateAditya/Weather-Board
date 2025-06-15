
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
        <Button onClick={handleSearch} className="bg-white/20 hover:bg-white/30 border-white/20">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
