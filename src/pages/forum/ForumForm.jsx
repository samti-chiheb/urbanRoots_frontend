import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import useForums from "../../hooks/forumHooks/useForums";
import useForum from "../../hooks/forumHooks/useForum";
import useCategories from "../../hooks/forumHooks/useCategories";
import { forumSchema } from "../../utils/validationSchema";
import { useParams } from "react-router-dom";

const ForumForm = () => {
  const navigate = useNavigate();
  const { forumId } = useParams();
  const { createForumMutation, updateForumMutation } = useForums();

  const {
    categories,
    isLoadingCategories,
    errorCategories,
    createCategoryMutation,
    deleteCategoryMutation,
    updateCategoryMutation,
  } = useCategories();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);

  const { data: forum } = useForum(forumId);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", description: "" },
    resolver: zodResolver(forumSchema),
  });

  useEffect(() => {
    if (forum) {
      setValue("title", forum.title);
      setValue("description", forum.description);
    }
  }, [forum, setValue]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      setValue("category", categories[0]._id);
    }
  }, [categories, setValue]);

  const onSubmit = (data) => {
    const forumData = {
      title: data.title,
      description: data.description,
      categories: [data.category],
    };

    if (forum) {
      const forumId = forum._id;
      console.log('====================================');
      console.log(forumId);
      console.log('====================================');
      updateForumMutation.mutate(
        { forumId, forumData },
        {
          onSuccess: () => {
            navigate("/forums");
          },
          onError: (error) => {
            toast.error(
              `Erreur lors de la création du forum: ${error.message}`
            );
          },
        }
      );
    } else {
      createForumMutation.mutate(forumData, {
        onSuccess: () => {
          navigate("/forums");
        },
        onError: (error) => {
          toast.error(`Erreur lors de la création du forum: ${error.message}`);
        },
      });
    }
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      createCategoryMutation.mutate(
        { name: newCategoryName },
        {
          onSuccess: () => {
            toast.success("Catégorie ajoutée avec succès");
            setNewCategoryName("");
            setShowAddCategory(false);
          },
          onError: (error) => {
            toast.error(
              `Erreur lors de l'ajout de la catégorie: ${error.message}`
            );
          },
        }
      );
    }
  };

  const handleDeleteCategory = (categoryId) => {
    deleteCategoryMutation.mutate(categoryId, {
      onSuccess: () => {
        toast.success("Catégorie supprimée avec succès");
      },
      onError: (error) => {
        toast.error(
          `Erreur lors de la suppression de la catégorie: ${error.message}`
        );
      },
    });
  };

  const handleEditCategory = (categoryId, newName) => {
    updateCategoryMutation.mutate(
      { categoryId, categoryData: { name: newName } },
      {
        onSuccess: () => {
          toast.success("Catégorie mise à jour avec succès");
          setEditingCategory(null);
          setEditCategoryName("");
        },
        onError: (error) => {
          toast.error(
            `Erreur lors de la mise à jour de la catégorie: ${error.message}`
          );
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {forum ? "Modifier un forum" : "Créer un nouveau forum"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            {...register("title", { required: "Titre est obligatoire" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description est obligatoire",
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Catégories
          </label>
          {isLoadingCategories ? (
            <p>Chargement des catégories...</p>
          ) : errorCategories ? (
            <p className="text-sm text-red-600">
              Erreur lors du chargement des catégories
            </p>
          ) : (
            <div className="space-y-2">
              <div className="relative flex items-center space-x-2">
                <select
                
                  {...register("category", {
                    required: "Catégorie est obligatoire",
                  })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    const selectedCategoryId = getValues("category");
                    const selectedCategory = categories.find(
                      (cat) => cat._id === selectedCategoryId
                    );
                    setEditingCategory(selectedCategoryId);
                    setEditCategoryName(selectedCategory.name);
                  }}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const selectedCategoryId = getValues("category");
                    if (
                      window.confirm(
                        "Êtes-vous sûr de vouloir supprimer cette catégorie ?"
                      )
                    ) {
                      handleDeleteCategory(selectedCategoryId);
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
              {editingCategory && (
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    type="text"
                    value={editCategoryName}
                    onChange={(e) => setEditCategoryName(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Nouveau nom de la catégorie"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleEditCategory(editingCategory, editCategoryName)
                    }
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Mettre à jour
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowAddCategory(!showAddCategory)}
                className="mt-2 flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaPlus className="mr-2" />
                {showAddCategory ? "Annuler" : "Ajouter une nouvelle catégorie"}
              </button>
              {showAddCategory && (
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Nom de la nouvelle catégorie"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Ajouter
                  </button>
                </div>
              )}
            </div>
          )}
          {errors.category && (
            <p className="mt-2 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {forum ? " Mettre à jour " : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForumForm;
