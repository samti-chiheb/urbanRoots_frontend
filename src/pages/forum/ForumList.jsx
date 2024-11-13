import { useState } from "react";
import ForumCard from "../../components/forum/ForumCard";
import useForums from "../../hooks/forumHooks/useForums";
import useCategories from "../../hooks/forumHooks/useCategories";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ForumList = () => {
  const { forums } = useForums();
  const { categories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { auth } = useAuth();

  const handleChange = (e) => {
    setSelectedCategoryId(e.target.value);
  };

  const filteredForums = selectedCategoryId
    ? forums.filter((forum) =>
        forum?.categories.some((cat) => cat?._id === selectedCategoryId)
      )
    : forums;

    console.log('====================================');
    console.log(auth);
    console.log('====================================');

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Aperçu du Forum</h1>
        {auth?.roles == 9009 && (
          <Link
            to="/forums/create-forum"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Créer Forum
          </Link>
        )}
      </div>
      <div className="mb-4">
        <select
          value={selectedCategoryId}
          onChange={handleChange}
          className="border p-2"
        >
          <option value="">Toutes les catégories</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {filteredForums?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredForums.map((forum) => (
            <ForumCard key={forum._id} forum={forum} />
          ))}
        </div>
      ) : (
        <p className="text-center p-6 text-2xl text-gray-400">
          Aucun forum trouvé pour cette catégorie.
        </p>
      )}
    </div>
  );
};

export default ForumList;
