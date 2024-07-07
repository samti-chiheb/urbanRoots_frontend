import RegisterForm from "../components/RegisterForm";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="max-w-lg mx-auto p-6 w-full bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        S'inscrire
      </h2>
      <RegisterForm />
      <p className="text-center text-gray-600">
        Vous avez déjà un compte ?
        <br />
        <span className="underline text-blue-500 hover:text-blue-700">
          <Link to="/login">Se connecter</Link>
        </span>
      </p>
    </div>
  );
};

export default Register;
