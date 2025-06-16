import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface WeatherMapProps {
  location: string;
}

// Component to update map center
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
}

// City coordinates (all keys in lowercase)
const cityCoordinates: { [key: string]: [number, number] } = {
  'london': [51.5074, -0.1278],
  'new york': [40.7128, -74.006],
  'tokyo': [35.6762, 139.6503],
  'paris': [48.8566, 2.3522],
  'pune': [18.5204, 73.8567],
  'mumbai': [19.076, 72.8777],
  'dubai': [25.2048, 55.2708],
  'singapore': [1.3521, 103.8198],
  'sydney': [-33.8688, 151.2093],
  'berlin': [52.52, 13.405],
  'moscow': [55.7558, 37.6173],
  'rio de janeiro': [-22.9068, -43.1729],
  'cairo': [30.0444, 31.2357],
  'buenos aires': [-34.6037, -58.3816],
  'istanbul': [41.0082, 28.9784],
  'ahmednagar': [19.0968, 74.7471],
  'bengaluru': [12.9716, 77.5946],
  'chennai': [13.0827, 80.2707],
  'kolkata': [22.5726, 88.3639],
  'hyderabad': [17.385, 78.4867],
  'jaipur': [26.9124, 75.7873],
  'lucknow': [26.8467, 80.9462],
  'ahmedabad': [23.0225, 72.5714],
  'surat': [21.1702, 72.8311],
  'kanpur': [26.4499, 80.3319],
  'nagpur': [21.1458, 79.0882],
  'visakhapatnam': [17.6868, 83.2185],
  'patna': [25.5941, 85.1376],
  'bhopal': [23.2599, 77.4126],
  'indore': [22.7196, 75.8577],
  'vadodara': [22.3072, 73.1812],
  'coimbatore': [11.0168, 76.9558],
  'thane': [19.2183, 72.9781],
  'nashik': [19.9975, 73.7898],
  'agra': [27.1767, 78.0081],
  'meerut': [28.9845, 77.7064],
  'jodhpur': [26.2389, 73.0243],
  'guwahati': [26.1445, 91.7362],
  'chandigarh': [30.7333, 76.7794],
  'dehradun': [30.3165, 78.0322],
  'mysuru': [12.2958, 76.6394],
  'puducherry': [11.9416, 79.8083],
  'kochi': [9.9312, 76.2673],
  'ludhiana': [30.9009, 75.8573],
  'amritsar': [31.5497, 74.3436],
  'raipur': [21.2514, 81.6296],
  'jamshedpur': [22.8046, 86.2029],
  'ranchi': [23.3441, 85.3096],
  'vijayawada': [16.5062, 80.648],
  'aurangabad': [19.8762, 75.3433],
  'kasti': [18.4122, 74.888],
};

export const WeatherMap = ({ location }: WeatherMapProps) => {
  const [coordinates, setCoordinates] = useState<[number, number]>(cityCoordinates['pune']);

  useEffect(() => {
    const normalizedLocation = location.toLowerCase().trim();
    
    // First try to get coordinates from our predefined list
    if (cityCoordinates[normalizedLocation]) {
      setCoordinates(cityCoordinates[normalizedLocation]);
      return;
    }

    // If not in our list, try to get coordinates from the API
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data && data[0]) {
          setCoordinates([data[0].lat, data[0].lon]);
        }
      })
      .catch(error => {
        console.error('Error fetching coordinates:', error);
        setCoordinates(cityCoordinates['pune']); // fallback to default
      });
  }, [location]);

  const icon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={coordinates}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coordinates} icon={icon}>
          <Popup>{location}</Popup>
        </Marker>
        <MapUpdater center={coordinates} />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
