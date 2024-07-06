import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="flex flex-col items-center justify-center ">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Accès Refusé</h1>
        <p className="text-gray-700 mb-6">
          Vous n'êtes pas autorisé à accéder à cette page.
        </p>
        <button
          onClick={goBack}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
        >
          Revenir en arrière
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
