import { z } from "zod";

export const registerSchema = z
  .object({
    firstname: z.string().nonempty({ message: "Le prénom est requis" }),
    lastname: z.string().nonempty({ message: "Le nom de famille est requis" }),
    username: z
      .string()
      .nonempty({ message: "Le nom d'utilisateur est requis" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z
      .string()
      .min(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères",
      }),
    confirmPassword: z
      .string()
      .min(6, {
        message:
          "La confirmation du mot de passe doit contenir au moins 6 caractères",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });


export const loginSchema = z.object({
  identifier: z
    .string()
    .nonempty({ message: "Nom d'utilisateur ou email est requis" }),
  password: z
    .string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
});