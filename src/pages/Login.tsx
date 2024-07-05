import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Connexion
      </h2>
      <LoginForm />
    </div>
  );
};

export default Login;
