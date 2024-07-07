import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Connexion
      </h2>
      <LoginForm />
      <p className="text-center text-gray-600">
        Besoin d'un compte ?
        <br />
        <span className="underline text-blue-500 hover:text-blue-700">
          <Link to="/register">Inscrivez-vous</Link>
        </span>
      </p>
    </div>
  );
};

export default Login;
