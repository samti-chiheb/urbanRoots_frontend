import { useState, useEffect } from "react";
import axios from "axios";

const useAddressAutocomplete = (input) => {
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  useEffect(() => {
    if (debouncedInput.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/search`,
            {
              params: {
                q: debouncedInput,
                format: "json",
                addressdetails: 1,
                limit: 5,
                countrycodes: "fr",
              },
            }
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching address suggestions:", error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedInput]);

  return suggestions;
};

export default useAddressAutocomplete;
