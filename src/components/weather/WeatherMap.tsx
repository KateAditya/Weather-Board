
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Map as MapIcon, Eye, EyeOff } from 'lucide-react';

interface WeatherMapProps {
  location: string;
}

export const WeatherMap = ({ location }: WeatherMapProps) => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setShowTokenInput(false);
    }
  };

  if (showTokenInput) {
    return (
      <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
        <div className="text-center">
          <MapIcon className="h-12 w-12 text-white mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-4">Weather Map</h3>
          <p className="text-white/80 mb-6">
            To display the interactive weather map, please enter your Mapbox public token.
          </p>
          <p className="text-white/60 text-sm mb-4">
            Get your free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-200 underline">mapbox.com</a>
          </p>
          <div className="max-w-md mx-auto space-y-4">
            <Input
              type="password"
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button 
              onClick={handleTokenSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            >
              Load Map
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Weather Map - {location}</h3>
        <Button
          onClick={() => setShowTokenInput(true)}
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <Eye className="h-4 w-4 mr-2" />
          Change Token
        </Button>
      </div>
      
      <div className="bg-white/5 rounded-lg p-8 text-center">
        <MapIcon className="h-16 w-16 text-white/60 mx-auto mb-4" />
        <p className="text-white/80">Interactive weather map would be displayed here</p>
        <p className="text-white/60 text-sm mt-2">
          With layers for precipitation, temperature, wind, and clouds
        </p>
      </div>
    </Card>
  );
};
