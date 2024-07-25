import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const MapComponent = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);

  return null;
};

const GardenMap = ({ gardens, selectedGarden }) => {
  const center = selectedGarden
    ? [
        selectedGarden.location.coordinates.coordinates[0],
        selectedGarden.location.coordinates.coordinates[1],
      ]
    : [48.8566, 2.3522];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "75vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selectedGarden && <MapComponent center={center} />}
      {gardens.map((garden) => (
        <Marker
          key={garden._id}
          position={[
            garden.location.coordinates.coordinates[0],
            garden.location.coordinates.coordinates[1],
          ]}
        >
          <Popup>
            <strong>{garden.name}</strong>
            <br />
            {garden.location.address.street}, {garden.location.address.city}
            <br />
            <Link
              to={`/gardens/${garden._id}`}
              className="text-blue-500 hover:underline"
            >
              Voir détails
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GardenMap;
