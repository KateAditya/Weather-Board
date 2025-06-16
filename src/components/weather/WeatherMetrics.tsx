
import React from 'react';
import { Card } from '@/components/ui/card';
import { Wind, Droplets, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';

interface WeatherData {
  wind_speed: number;
  humidity: number;
  visibility: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  uvi?: number;
}

interface WeatherMetricsProps {
  data: WeatherData;
}

export const WeatherMetrics = ({ data }: WeatherMetricsProps) => {
  const metrics = [
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${Math.round(data.wind_speed)} m/s`,
      color: 'text-blue-300'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${data.humidity}%`,
      color: 'text-cyan-300'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${Math.round(data.visibility / 1000)} km`,
      color: 'text-green-300'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${data.pressure} hPa`,
      color: 'text-purple-300'
    },
    {
      icon: Sunrise,
      label: 'Sunrise',
      value: new Date(data.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: 'text-orange-300'
    },
    {
      icon: Sunset,
      label: 'Sunset',
      value: new Date(data.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: 'text-pink-300'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
  {metrics
    .filter((metric) => metric.value !== null && metric.value !== undefined)
    .map((metric, index) => (
      <Card key={index} className="p-4 bg-white/10 backdrop-blur-md border-white/20">
        <div className="flex items-center gap-3">
          <metric.icon className={`h-5 w-5 ${metric.color}`} />
          <div>
            <p className="text-white/60 text-sm">{metric.label}</p>
            <p className="text-white font-semibold">{metric.value}</p>
          </div>
        </div>
      </Card>
  ))}

  {data.uvi > 0 && (
    <Card className="p-4 bg-white/10 backdrop-blur-md border-white/20">
      <div className="flex items-center gap-3">
        <span className="text-yellow-300">☀️</span>
        <div>
          <p className="text-white/60 text-sm">UV Index</p>
          <p className="text-white font-semibold">{Math.round(data.uvi)}</p>
        </div>
      </div>
    </Card>
  )}
</div>

  );
};
