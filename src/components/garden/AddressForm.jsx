import React, { useState } from "react";
import useAddressAutocomplete from "../../hooks/useAddressAutocomplete";

const AddressForm = ({ formData, setFormData }) => {
  const [input, setInput] = useState("");
  const suggestions = useAddressAutocomplete(input);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "street") {
      setInput(value);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSuggestionClick = (suggestion) => {
    const { lat, lon, address } = suggestion;
    const street = address.road || address.pedestrian || "";
    const city = address.city || address.town || address.village || "";
    const postalCode = address.postcode || "";

    setFormData({
      ...formData,
      street,
      city,
      postalCode,
      lat: parseFloat(lat),
      lng: parseFloat(lon),
    });
    setInput("");
  };

  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nom
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="street"
          className="block text-sm font-medium text-gray-700"
        >
          Rue
        </label>
        <input
          type="text"
          name="street"
          id="street"
          value={formData.street}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        {input && suggestions.length > 0 && (
          <ul className="border border-gray-300 rounded-md mt-2 bg-white">
            {suggestions.map((suggestion) => {
              const { address } = suggestion;
              const street = address.road || address.pedestrian || "";
              const city =
                address.city || address.town || address.village || "";
              const postalCode = address.postcode || "";

              return (
                <li
                  key={suggestion.place_id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {street}, {city}, {postalCode}
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          Ville
        </label>
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label
          htmlFor="postalCode"
          className="block text-sm font-medium text-gray-700"
        >
          Code Postal
        </label>
        <input
          type="text"
          name="postalCode"
          id="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </form>
  );
};

export default AddressForm;
