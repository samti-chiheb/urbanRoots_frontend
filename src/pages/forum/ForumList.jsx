import { useEffect, useState } from "react";
import ForumCard from "../../components/forum/ForumCard";
import { getAllCategories } from "../../services/api/categoryService";
import { getForums } from "../../services/api/forumService";

const ForumList = () => {
  const [categories, setCategories] = useState([]);
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const initComponent = async () => {
      try {
        const categoriesRes = await getAllCategories();
        setCategories(categoriesRes);
        const forumsRes = await getForums();
        setForums(forumsRes);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      } finally {
        setLoading(false);
      }
    };

    initComponent();
  }, []);

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredForums = selectedCategory
    ? forums.filter((forum) =>
        forum?.categories.some((cat) => cat?._id === selectedCategory)
      )
    : forums;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Aperçu du Forum</h1>
      <div className="mb-4">
        <select
          value={selectedCategory}
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
