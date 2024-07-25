import useAuth from "./useAuth";
import useUser from "./useUser";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  emailSchema,
  usernameSchema,
  passwordSchema,
  websiteSchema,
  socialLinksSchema,
} from "../utils/validationSchema";

const useUserInfoFields = () => {
  const { auth } = useAuth();
  const { userInfo } = auth;
  const {
    updateUser,
    updateUserUsername,
    updateUserEmail,
    updateUserPassword,
  } = useUser();

  const validateField = (label, value) => {
    try {
      switch (label) {
        case "email":
          emailSchema.parse(value);
          break;
        case "username":
          usernameSchema.parse(value);
          break;
        case "password":
          passwordSchema.parse(value);
          break;
        case "website":
          websiteSchema.parse(value);
          break;
        case "socialLinks":
          socialLinksSchema.parse(value);
          break;
      }
      return null;
    } catch (e) {
      if (e instanceof z.ZodError) {
        return e.errors[0].message;
      }
      return "Erreur de validation";
    }
  };

  const handleSave = (label, newValue, password) => {
    const error = validateField(label, newValue);
    if (error) {
      toast.error(error);
      return;
    }

    if (label === "email") {
      updateUserEmail.mutate({ email: newValue, password });
    } else if (label === "username") {
      updateUserUsername.mutate({ username: newValue, password });
    } else if (label === "newPassword") {
      updateUserPassword.mutate({ newPassword: newValue, password });
    } else {
      updateUser.mutate({ [label]: newValue });
    }
  };

  const userInfoFields = [
    {
      label: "firstname",
      value: userInfo.firstname,
      onSave: (newValue) => handleSave("firstname", newValue),
    },
    {
      label: "lastname",
      value: userInfo.lastname,
      onSave: (newValue) => handleSave("lastname", newValue),
    },
    {
      label: "email",
      value: userInfo.email,
      onSave: (newValue, password) => handleSave("email", newValue, password),
    },
    {
      label: "Username",
      value: userInfo.username,
      onSave: (newValue, password) =>
        handleSave("username", newValue, password),
    },
    {
      label: "password",
      value: "",
      onSave: (newValue, password) =>
        handleSave("newPassword", newValue, password),
    },
    {
      label: "location",
      value: userInfo.location,
      onSave: (newValue) => handleSave("location", newValue),
    },
    {
      label: "bio",
      value: userInfo.bio,
      onSave: (newValue) => handleSave("bio", newValue),
    },
    {
      label: "website",
      value: userInfo.website,
      onSave: (newValue) => handleSave("website", newValue),
    },
    {
      label: "twitter",
      value: userInfo.socialLinks.twitter,
      onSave: (newValue) =>
        handleSave("socialLinks", {
          ...userInfo.socialLinks,
          twitter: newValue,
        }),
    },
    {
      label: "facebook",
      value: userInfo.socialLinks.facebook,
      onSave: (newValue) =>
        handleSave("socialLinks", {
          ...userInfo.socialLinks,
          facebook: newValue,
        }),
    },
    {
      label: "instagram",
      value: userInfo.socialLinks.instagram,
      onSave: (newValue) =>
        handleSave("socialLinks", {
          ...userInfo.socialLinks,
          instagram: newValue,
        }),
    },
    {
      label: "linkedIn",
      value: userInfo.socialLinks.linkedin,
      onSave: (newValue) =>
        handleSave("socialLinks", {
          ...userInfo.socialLinks,
          linkedin: newValue,
        }),
    },
  ];

  return userInfoFields;
};

export default useUserInfoFields;
