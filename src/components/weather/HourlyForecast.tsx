
import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getWeatherIcon } from '@/utils/weatherUtils';

interface HourlyForecastProps {
  data: any[];
}

export const HourlyForecast = ({ data }: HourlyForecastProps) => {
  const next24Hours = data.slice(0, 24);

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20">
      <h3 className="text-xl font-semibold text-white mb-4">24-Hour Forecast</h3>
      <ScrollArea className="w-full">
        <div className="flex gap-4 pb-4">
          {next24Hours.map((hour, index) => (
            <div key={index} className="flex-shrink-0 text-center min-w-[80px]">
              <p className="text-white/60 text-sm mb-2">
                {index === 0 ? 'Now' : new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit' })}
              </p>
              <div className="text-2xl mb-2">{getWeatherIcon(hour.weather[0].icon)}</div>
              <p className="text-white font-semibold">{Math.round(hour.temp)}°</p>
              <p className="text-white/60 text-xs mt-1">{hour.pop ? `${Math.round(hour.pop * 100)}%` : ''}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
