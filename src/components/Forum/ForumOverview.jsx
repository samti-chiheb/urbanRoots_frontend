import React, { useEffect, useState } from "react";
import ForumCategoryLink from "./ForumCategoryLink";
import { getAllCategories } from "../../services/api/categoryService";

const ForumOverview = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Aperçu du Forum</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <ForumCategoryLink key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default ForumOverview;
