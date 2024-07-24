// src/components/UserInfo.jsx
import React, { useEffect, useState } from "react";
import {
  UserIcon,
  MailIcon,
  LocationMarkerIcon,
  PencilAltIcon,
  LinkIcon,
  LockClosedIcon,
} from "@heroicons/react/outline";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPencilAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";

const icons = {
  "First Name": <UserIcon className="h-6 w-6 text-gray-500" />,
  "Last Name": <UserIcon className="h-6 w-6 text-gray-500" />,
  Email: <MailIcon className="h-6 w-6 text-gray-500" />,
  Username: <PencilAltIcon className="h-6 w-6 text-gray-500" />,
  Password: <LockClosedIcon className="h-6 w-6 text-gray-500" />,
  Location: <LocationMarkerIcon className="h-6 w-6 text-gray-500" />,
  Bio: <PencilAltIcon className="h-6 w-6 text-gray-500" />,
  Website: <LinkIcon className="h-6 w-6 text-gray-500" />,
  Twitter: <FaTwitter className="h-6 w-6 text-blue-400" />,
  Facebook: <FaFacebook className="h-6 w-6 text-blue-600" />,
  Instagram: <FaInstagram className="h-6 w-6 text-pink-600" />,
  LinkedIn: <FaLinkedin className="h-6 w-6 text-blue-700" />,
};

const UserInfo = ({ label, value, onSave, error }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(inputValue, password);
    setPassword("");
    !error && setIsEditing(false);
  };

  const handleCancelClick = () => {
    setInputValue(value);
    setPassword("");
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center mb-4">
      <div className="flex items-center w-32">
        {icons[label]}
        <span className="ml-2 font-bold">{label}:</span>
      </div>
      {isEditing ? (
        <div className="flex items-center">
          <input
            type={
              label === "Password"
                ? passwordVisible
                  ? "text"
                  : "password"
                : "text"
            }
            className={`border p-1 ${error && "border-red-500"} `}
            placeholder={label === "Password" ? "nouveau mot de passe" : ""}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {(label === "Username" ||
            label === "Email" ||
            label === "Password") && (
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Mot de passe actuel"
                className={`border p-1 ml-2 ${error && "border-red-500"} `}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <HiEyeOff /> : <HiEye />}
              </span>
            </div>
          )}
          <button onClick={handleSaveClick} className="ml-2 text-green-500">
            <FaCheck className="h-5 w-5" />
          </button>
          <button onClick={handleCancelClick} className="ml-2 text-red-500">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center">
          <span className={`ml-2 ${value || "text-gray-400"}`}>
            {label === "Password"
              ? "*********"
              : value || "Ajoutez une information"}
          </span>
          <button onClick={handleEditClick} className="ml-2 text-blue-500">
            <FaPencilAlt className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
