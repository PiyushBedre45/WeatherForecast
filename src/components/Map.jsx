
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Pin from '../public/Pin.png'; // Path to your custom marker icon

// Fix for marker icon not displaying properly
const customIcon = new L.Icon({
  iconUrl: Pin,
  iconSize: [40, 40], // Default size
  iconAnchor: [12, 41], // Anchor point for the icon
  popupAnchor: [1, -34], // Anchor point for the popup
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41], // Default shadow size
});

// Component to dynamically update the map's center
const UpdateMapCenter = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    if (location.latitude && location.longitude) {
      map.setView([location.latitude, location.longitude], map.getZoom());
    }
  }, [location, map]);

  return null;
};

const Map = ({ location }) => {
  const apiKey = "09367e9a29f32f2a3da8be9fd21955c2";

  // Log the location to ensure the values are being passed correctly
  console.log(location.longitude, location.latitude);

  return (
    <div className="w-full h-[100%] rounded-md overflow-hidden shadow-md">
      <MapContainer
        center={[location.latitude || 18.5204, location.longitude || 73.8567]} // Default to Pune if location is undefined
        zoom={10}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        {/* Dynamically update the map's center */}
        <UpdateMapCenter location={location} />

        {/* Base Map Layer */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* OpenWeather Weather Overlay */}
        <TileLayer
          url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`}
          opacity={0.5}
        />

        {/* Marker for the exact location */}
        {location.latitude && location.longitude && (
          <Marker
            position={[location.latitude, location.longitude]}
            icon={customIcon} // Use the custom icon
          >
            <Popup>
              Exact Location: [{location.latitude}, {location.longitude}]
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;