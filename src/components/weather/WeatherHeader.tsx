import React from 'react';
import { Cloud } from 'lucide-react';

export const WeatherHeader = () => {
  return (
    <div className="text-center mb-4 sm:mb-8">
      <div className="flex justify-center items-center mb-2 sm:mb-4">
        <Cloud className="h-8 w-8 sm:h-12 sm:w-12 text-white mr-2 sm:mr-3" />
        <h1 className="text-3xl sm:text-4xl font-bold text-white">WeatherBoard</h1>
      </div>
      <p className="text-white/80 text-base sm:text-lg">Weather, Wherever You Go.</p>
    </div>
  );
};
  
