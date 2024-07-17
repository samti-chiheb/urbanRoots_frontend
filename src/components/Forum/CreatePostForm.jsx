import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { postSchema } from "../../utils/validationSchema";
import FormInput from "../common/FormInput";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const CreatePostForm = ({ forumId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });


  const axiosPrivate = useAxiosPrivate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosPrivate.post(
        `/forums/${forumId}/posts`,
        data
      );
      toast.success("Post créé avec succès !");
    } catch (error) {
      toast.error(`Erreur : ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <FormInput
        label="Title"
        type="text"
        register={register("title")}
        error={errors.title?.message}
      />
      <FormInput
        label="Description"
        type="text"
        register={register("description")}
        error={errors.description?.message}
      />
      <FormInput
        label="Tags"
        type="text"
        register={register("tags")}
        error={errors.tags?.message}
      />
      <button
        type="submit"
        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;