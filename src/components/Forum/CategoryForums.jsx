import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ForumItem from "./ForumItem";
import handleApiErrors from "../../utils/handleApiErrors";
import { getForumByCategory } from "../../services/api/forumService";
import { getOneCategory } from "../../services/api/categoryService";

const CategoryForums = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState();
  const [categoryForums, setCategoryForums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryForums = async () => {
      try {
        const categoryRes = await getOneCategory(categoryId);
        if (!categoryRes) {
          navigate("/404"); // Revenir en arrière si la catégorie n'existe pas
          return;
        }

        const forumsRes = await getForumByCategory(categoryId);
        setCategoryForums(forumsRes);
        setCategory(categoryRes);
      } catch (error) {
        handleApiErrors(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryForums();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Forums : <span className="text-blue-600">{category?.name}</span>
      </h1>
      <div className="relative space-y-2">
        {categoryForums.map((forum, index) => (
          <div
            key={forum._id}
            className={`relative p-2 transition-transform duration-300 transform ${
              index !== 0 && "translate-y-1"
            }`}
          >
            <ForumItem forum={forum} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryForums;
