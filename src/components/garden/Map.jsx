import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const LocationMarker = ({ position, setPosition, onSelectLocation }) => {
  const map = useMap();

  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPosition({ lat, lng });
      onSelectLocation({ lat, lng });
      map.flyTo([lat, lng], map.getZoom());
    },
  });

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], map.getZoom());
    }
  }, [position, map]);

  return position ? <Marker position={position}></Marker> : null;
};

const Map = ({ formData, onSelectLocation }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (formData.lat && formData.lng) {
      setPosition({ lat: formData.lat, lng: formData.lng });
    }
  }, [formData.lat, formData.lng]);

  return (
    <MapContainer
      center={[position?.lat || 48.8566, position?.lng || 2.3522]}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-64 border border-gray-300 rounded-md"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker
        position={position}
        setPosition={setPosition}
        onSelectLocation={onSelectLocation}
      />
    </MapContainer>
  );
};

export default Map;