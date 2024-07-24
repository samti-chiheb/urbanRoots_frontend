import { useState } from "react";
import useAuth from "../hooks/useAuth";
import UserInfo from "../components/UserInfo";
import useUser from "../hooks/useUser";
import { z } from "zod";
import { toast } from "react-toastify";
import {
  emailSchema,
  usernameSchema,
  passwordSchema,
} from "../utils/validationSchema";

const Profile = () => {
  const { auth } = useAuth();
  const { userInfo } = auth;
  const {
    updateUser,
    updateUserUsername,
    updateUserEmail,
    updateUserPassword,
  } = useUser();
  const [error, setError] = useState();

  const validateField = (label, value) => {
    try {
      if (label === "Email") {
        emailSchema.parse(value);
      } else if (label === "Username") {
        usernameSchema.parse(value);
      } else if (label === "Password") {
        passwordSchema.parse(value);
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
      setError(error);
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
      updateUser.mutate({ [label.toLowerCase()]: newValue });
    }
  };

  const userInfoFields = [
    {
      label: "First Name",
      value: userInfo.firstname,
      onSave: (newValue) => handleSave("firstname", newValue),
    },
    {
      label: "Last Name",
      value: userInfo.lastname,
      onSave: (newValue) => handleSave("lastname", newValue),
    },
    {
      label: "Email",
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
      label: "Password",
      value: "",
      onSave: (newValue, password) =>
        handleSave("newPassword", newValue, password),
    },
    {
      label: "Location",
      value: userInfo.location,
      onSave: (newValue) => handleSave("Location", newValue),
    },
    {
      label: "Bio",
      value: userInfo.bio,
      onSave: (newValue) => handleSave("Bio", newValue),
    },
    {
      label: "Website",
      value: userInfo.website,
      onSave: (newValue) => handleSave("Website", newValue),
    },
    {
      label: "Twitter",
      value: userInfo.socialLinks.twitter,
      onSave: (newValue) =>
        handleSave("Twitter", { ...userInfo.socialLinks, twitter: newValue }),
    },
    {
      label: "Facebook",
      value: userInfo.socialLinks.facebook,
      onSave: (newValue) =>
        handleSave("Facebook", { ...userInfo.socialLinks, facebook: newValue }),
    },
    {
      label: "Instagram",
      value: userInfo.socialLinks.instagram,
      onSave: (newValue) =>
        handleSave("Instagram", {
          ...userInfo.socialLinks,
          instagram: newValue,
        }),
    },
    {
      label: "LinkedIn",
      value: userInfo.socialLinks.linkedin,
      onSave: (newValue) =>
        handleSave("LinkedIn", { ...userInfo.socialLinks, linkedin: newValue }),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-8">Profile</h1>
      <div className="flex flex-col gap-4">
        {userInfoFields.map((field, index) => (
          <UserInfo
            key={index}
            label={field.label}
            value={field.value}
            onSave={field.onSave}
            error={error}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
