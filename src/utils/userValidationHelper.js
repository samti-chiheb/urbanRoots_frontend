import { z } from "zod";
import {
  emailSchema,
  usernameSchema,
  passwordSchema,
} from "./validationSchema";

// Dictionnaire des schémas de validation
const validationSchemas = {
  Email: emailSchema,
  Username: usernameSchema,
  Password: passwordSchema,
};

// Fonction pour valider un champ en utilisant le schéma approprié
export default function validateField(label, value) {
  try {
    if (validationSchemas[label]) {
      validationSchemas[label].parse(value);
    }
    return null;
  } catch (e) {
    if (e instanceof z.ZodError) {
      return e.errors[0].message;
    }
    return "Erreur de validation";
  }
}
