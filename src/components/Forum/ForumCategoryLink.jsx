import { Link } from "react-router-dom";
import { getForumByCategory } from "../../services/api/forumService";
import handleApiErrors from "../../utils/handleApiErrors";
import { useState, useEffect } from "react";

const ForumCategoryLink = ({ category }) => {
  const [categoryForums, setCategoryForums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryForums = async () => {
      try {
        const response = await getForumByCategory(category._id);
        setCategoryForums(response);
      } catch (error) {
        handleApiErrors(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryForums();
  }, [category._id]);

  return (
    <Link
      to={`/forums/${category._id}`}
      className="block p-4 border border-gray-300 rounded-md"
    >
      <h2 className="text-xl font-bold">{category.name}</h2>
      {loading && <p>Chargement...</p>}
      <ul className="divide-y divide-gray-200 mt-2">
        {categoryForums?.map((forum) => (
          <li
            key={forum._id}
            className="flex items-center p-3 hover:bg-blue-50 transition-colors duration-200"
          >
            <span className="text-gray-800 hover:text-gray-700">
              {forum.title}
            </span>
          </li>
        ))}
      </ul>
    </Link>
  );
};

export default ForumCategoryLink;
