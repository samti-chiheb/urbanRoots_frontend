// src/utils/errorHandler.js
import { toast } from "react-toastify";

const handleApiErrors = (error) => {
  let errorMessage = "Une erreur inconnue est survenue";

  if (error.response) {
    if (error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else {
      errorMessage = `Erreur serveur : ${error.response.statusText}`;
    }
  } else if (error.message) {
    errorMessage = error.message;
  }

  toast.error(errorMessage);
};

export default handleApiErrors;