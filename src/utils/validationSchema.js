import { z } from "zod";

export const registerSchema = z
  .object({
    firstname: z.string().nonempty({ message: "Le prénom est requis" }),
    lastname: z.string().nonempty({ message: "Le nom de famille est requis" }),
    username: z
      .string()
      .min(3, {
        message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
      })
      .max(20, {
        message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères.",
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "Le nom d'utilisateur ne doit pas inclure de caractères spéciaux ni d'espaces.",
      })
      .nonempty({ message: "Le nom d'utilisateur est requis" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    confirmPassword: z.string().min(6, {
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
  persist: z.boolean().optional(),
});

export const postSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "La description est requise"),
  tags: z.string().optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Le commentaire est requis"),
});

export const emailSchema = z
  .string()
  .email({ message: "Adresse email invalide." });

export const usernameSchema = z
  .string()
  .min(3, {
    message: "Le nom d'utilisateur doit contenir au moins 3 caractères.",
  })
  .max(20, {
    message: "Le nom d'utilisateur ne doit pas dépasser 20 caractères.",
  })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message:
      "Le nom d'utilisateur ne doit pas inclure de caractères spéciaux ni d'espaces.",
  });

export const passwordSchema = z.string().min(6, {
  message: "Le mot de passe doit contenir au moins 6 caractères.",
});

export const websiteSchema = z.string().refine(
  (url) => {
    const regex =
      /^(http:\/\/|https:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return regex.test(url);
  },
  {
    message: "URL invalide",
  }
);

export const socialLinksSchema = z.object({
  twitter: websiteSchema.optional(),
  facebook: websiteSchema.optional(),
  instagram: websiteSchema.optional(),
  linkedin: websiteSchema.optional(),
});

export const forumSchema = z.object({
  title: z.string().min(1, "Le titre est obligatoire"),
  description: z.string().min(1, "La description est obligatoire"),
  category: z.string().min(1, "Au moins une catégorie est obligatoire"),
});

export const exchangeSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre est obligatoire")
    .max(100, "Le titre ne peut pas dépasser 100 caractères"),
  description: z
    .string()
    .min(1, "La description est obligatoire")
    .max(500, "La description ne peut pas dépasser 500 caractères"),
  category: z.string().min(1, "La catégorie est obligatoire"),
  location: z.string().min(1, "La localisation est obligatoire"),
  imageUrl: z.string().optional(),
  status: z.string().optional(),
});
