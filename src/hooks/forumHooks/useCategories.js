import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/api/categoryService";
import useAxiosPrivate from "../useAxiosPrivate";
import handleApiErrors from "../../utils/handleApiErrors";
import { toast } from "react-toastify";

const useCategories = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // Hook pour récupérer toutes les catégories
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Hook pour récupérer une catégorie par ID
  const fetchCategoryById = (categoryId) => {
    return useQuery({
      queryKey: ["category", categoryId],
      queryFn: () => getCategoryById(categoryId),
      enabled: !!categoryId,
      onError: handleApiErrors,
    });
  };

  // Mutation pour créer une catégorie
  const createCategoryMutation = useMutation({
    mutationFn: (categoryData) => createCategory(axiosPrivate, categoryData),
    onSuccess: (data) => {
      toast.success(data.message || "Catégorie créée avec succès");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: handleApiErrors,
  });

  // Mutation pour mettre à jour une catégorie
  const updateCategoryMutation = useMutation({
    mutationFn: ({ categoryId, categoryData }) =>
      updateCategory(axiosPrivate, categoryId, categoryData),
    onSuccess: (data) => {
      toast.success(data.message || "Catégorie mise à jour avec succès");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: handleApiErrors,
  });

  // Mutation pour supprimer une catégorie
  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId) => deleteCategory(axiosPrivate, categoryId),
    onSuccess: (data) => {
      toast.success("Catégorie supprimée avec succès");
      queryClient.invalidateQueries(["categories"]);
    },
    onError: handleApiErrors,
  });

  return {
    categories,
    isLoadingCategories,
    errorCategories,
    fetchCategoryById,
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
};

export default useCategories;
