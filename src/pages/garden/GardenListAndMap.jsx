import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGarden from "../../hooks/useGarden";
import useAuth from "../../hooks/useAuth";
import GardenMap from "../../components/garden/GardenMap";
import GardenList from "../../components/garden/GardenList";

/**
 * Composant pour afficher la liste des jardins urbains et une carte interactive
 */
const GardenListAndMap = () => {
  const { gardensQuery } = useGarden();
  const [selectedGarden, setSelectedGarden] = useState(null);
  const navigate = useNavigate();
  const { auth } = useAuth();

  if (gardensQuery.isLoading) {
    return <div>Chargement...</div>;
  }

  if (gardensQuery.isError) {
    return <div>Erreur lors du chargement des jardins.</div>;
  }

  const { data: gardens } = gardensQuery;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <h1 className="col-span-3 text-3xl font-bold mb-4">Jardins Urbains</h1>
      <GardenList
        gardens={gardens}
        auth={auth}
        navigate={navigate}
        onSelectGarden={setSelectedGarden}
      />
      <div className="col-span-1 md:col-span-2 z-0">
        <GardenMap gardens={gardens} selectedGarden={selectedGarden} />
      </div>
    </div>
  );
};

export default GardenListAndMap;
