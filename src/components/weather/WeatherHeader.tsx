
import React from 'react';
import { Cloud } from 'lucide-react';

export const WeatherHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center mb-4">
        <Cloud className="h-12 w-12 text-white mr-3" />
        <h1 className="text-4xl font-bold text-white">WeatherPro</h1>
      </div>
      <p className="text-white/80 text-lg">Your comprehensive weather companion</p>
    </div>
  );
};
