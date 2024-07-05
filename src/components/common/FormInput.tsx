import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  type: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  register,
  error,
}) => (
  <div className="flex flex-col space-y-1">
    <label className={` ${error ? "text-red-600" : "text-gray-700"}`}>
      {error || label}
    </label>
    <input
      type={type}
      {...register}
      className={`border border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200 w-full ${
        error ? "border-red-300" : ""
      }`}
    />
  </div>
);

export default FormInput;
