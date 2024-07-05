// import PageWrapper from "../components/layout/PageWrapper";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="max-w-lg mx-auto p-6 w-full bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        S'inscrire
      </h2>
      <RegisterForm />
    </div>
  );
};

export default Register;
// export default PageWrapper(Register, "register");
