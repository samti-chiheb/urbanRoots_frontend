import React, { useState } from "react";
import GardenDetails from "./GardenDetails";

const GardenList = ({ gardens, auth, navigate, onSelectGarden }) => {
  const [expandedGarden, setExpandedGarden] = useState(null);

  const toggleAccordion = (garden) => {
    if (expandedGarden && expandedGarden._id === garden._id) {
      setExpandedGarden(null);
      onSelectGarden(null);
    } else {
      setExpandedGarden(garden);
      onSelectGarden(garden);
    }
  };

  return (
    <div className="col-span-1 md:col-span-1 h-[75vh] overflow-hidden">
      {auth && (
        <button
          onClick={() => navigate("/create-map")}
          className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Ajouter un Jardin
        </button>
      )}
      <div className="h-full overflow-y-auto">
        {gardens.map((garden) => (
          <div key={garden._id} className="mb-2">
            <h2 id={`accordion-heading-${garden._id}`}>
              <button
                type="button"
                className="flex items-center text-left justify-between w-full p-4 font-medium text-gray-700 border border-gray-200 rounded hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
                onClick={() => toggleAccordion(garden)}
                aria-expanded={
                  expandedGarden && expandedGarden._id === garden._id
                }
                aria-controls={`accordion-body-${garden._id}`}
              >
                <span>
                  {garden.name} - {garden.location.address.city}
                </span>
                <svg
                  className={`w-4 h-4 transform ${
                    expandedGarden && expandedGarden._id === garden._id
                      ? "rotate-180"
                      : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            </h2>
            {expandedGarden && expandedGarden._id === garden._id && (
              <div
                id={`accordion-body-${garden._id}`}
                className="p-4 border border-t-0 border-gray-200 dark:border-gray-600"
              >
                <GardenDetails selectedGarden={expandedGarden} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GardenList;
