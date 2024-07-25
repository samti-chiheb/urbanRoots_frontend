
import { useLoginForm } from "../hooks/useLoginForm";
import FormInput from "./common/FormInput";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const { register, handleSubmit, errors } = useLoginForm();
  const { togglePersist, persist } = useAuth();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-6">
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
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="trustDevice"
          className="border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          onChange={togglePersist}
          checked={persist}
        />
        <label htmlFor="trustDevice" className="text-gray-700">
          Rester connecté
        </label>
      </div>
    </form>
  );
};

export default LoginForm;
