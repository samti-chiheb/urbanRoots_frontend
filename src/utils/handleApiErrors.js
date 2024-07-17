const handleApiErrors = (status) => {
  
  let errorMessage = "";

  switch (status) {
    case 400:
      errorMessage = "Données invalides.";
      break;
    case 401:
      errorMessage = "Non authentifié.";
      break;
    case 403:
      errorMessage = "Accès refusé.";
      break;
    case 404:
      errorMessage = "Non trouvé.";
      break;
    case 500:
      errorMessage = "Erreur serveur.";
      break;
    case 503:
      errorMessage = "Service indisponible.";
      break;
    default:
      errorMessage = "Erreur inconnue.";
  }

  return errorMessage;
};

export default handleApiErrors;