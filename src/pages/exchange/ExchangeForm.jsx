import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useExchanges from "../../hooks/useExchanges";
import { exchangeSchema } from "../../utils/validationSchema";

const ExchangeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupère l'ID de l'annonce (si fourni pour la mise à jour)

  const { exchanges, createExchangeMutation, updateExchangeMutation } =
    useExchanges();
  const exchange = exchanges ? exchanges.find((ex) => ex._id === id) : null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      status: "actif", // Valeur par défaut pour le statut
    },
    resolver: zodResolver(exchangeSchema), // Schéma de validation
  });

  // Pré-remplit le formulaire si on modifie une annonce
  useEffect(() => {
    if (exchange) {
      setValue("title", exchange.title);
      setValue("description", exchange.description);
      setValue("category", exchange.category);
      setValue("location", exchange.location);
      setValue("status", exchange.status);
    }
  }, [exchange, setValue]);

  // Fonction de soumission du formulaire (création ou mise à jour)
  const onSubmit = (data) => {
    const exchangeData = {
      title: data.title,
      description: data.description,
      category: data.category,
      location: data.location,
      status: data.status,
    };

    if (exchange) {
      // Mise à jour d'une annonce
      updateExchangeMutation.mutate(
        { exchangeId: exchange._id, exchangeData },
        {
          onSuccess: () => {
            
            navigate("/exchanges");
          },
          onError: (error) => {
            toast.error(
              `Erreur lors de la mise à jour de l'annonce : ${error.message}`
            );
          },
        }
      );
    } else {
      // Création d'une nouvelle annonce
      createExchangeMutation.mutate(exchangeData, {
        onSuccess: () => {
          navigate("/exchanges");
        },
        onError: (error) => {
          toast.error(
            `Erreur lors de la création de l'annonce : ${error.message}`
          );
        },
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {exchange ? "Modifier l'annonce" : "Créer une nouvelle annonce"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Champ Titre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Titre
          </label>
          <input
            type="text"
            {...register("title", { required: "Le titre est obligatoire" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Champ Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "La description est obligatoire",
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Champ Catégorie */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Catégorie
          </label>
          <input
            type="text"
            {...register("category", {
              required: "La catégorie est obligatoire",
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.category && (
            <p className="mt-2 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Champ Localisation */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Localisation
          </label>
          <input
            type="text"
            {...register("location", {
              required: "La localisation est obligatoire",
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
          {errors.location && (
            <p className="mt-2 text-sm text-red-600">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Champ Statut */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            {...register("status", { required: "Le statut est obligatoire" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="actif">Actif</option>
            <option value="réservé">Réservé</option>
            <option value="completé">Completé</option>
            <option value="annulé">Annulé</option>
          </select>
          {errors.status && (
            <p className="mt-2 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>

        {/* Bouton de soumission */}
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            {exchange ? "Mettre à jour" : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExchangeForm;