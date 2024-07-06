import FormInput from "./common/FormInput";
import { useRegisterForm } from "../hooks/useRegisterForm";

const RegisterForm = () => {
  const { register, handleSubmit, errors } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <FormInput
        label="Prénom"
        type="text"
        register={register("firstname")}
        error={errors.firstname?.message}
      />
      <FormInput
        label="Nom de famille"
        type="text"
        register={register("lastname")}
        error={errors.lastname?.message}
      />
      <FormInput
        label="Nom d'utilisateur"
        type="text"
        register={register("username")}
        error={errors.username?.message}
      />
      <FormInput
        label="Email"
        type="email"
        register={register("email")}
        error={errors.email?.message}
      />
      <FormInput
        label="Mot de passe"
        type="password"
        register={register("password")}
        error={errors.password?.message}
      />
      <FormInput
        label="Confirmer le mot de passe"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:ring focus:ring-blue-300 transition duration-300"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default RegisterForm;
