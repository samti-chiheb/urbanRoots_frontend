import React from "react";
import { useLoginForm } from "../hooks/useLoginForm";
import FormInput from "./common/FormInput";

const LoginForm = () => {
  const { register, handleSubmit, errors } = useLoginForm();

  return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Nom d'utilisateur ou Email"
          type="text"
          register={register("identifier")}
          error={errors.identifier?.message}
        />
        <FormInput
          label="Mot de passe"
          type="password"
          register={register("password")}
          error={errors.password?.message}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-300"
        >
          Connexion
        </button>
      </form>
  );
};

export default LoginForm;
