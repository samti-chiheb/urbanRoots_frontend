import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { commentSchema } from "../../utils/validationSchema";
import FormInput from "../common/FormInput";
import useComments from "../../hooks/forumHooks/useComments";

const ReplyForm = ({ postId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(commentSchema),
  });

  const { createCommentMutation } = useComments(postId);

  const onSubmit = (data) => {
    console.log(data);
    createCommentMutation.mutate(
      { postId, ...data },
      {
        onSuccess: () => {
          toast.success("Commentaire posté avec succès !");
          reset();
        },
        onError: (error) => {
          toast.error(
            `Erreur : ${error.response?.data?.message || error.message}`
          );
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <FormInput
        label="Comment"
        type="text"
        register={register("content")}
        error={errors.text?.message}
      />
      <button
        type="submit"
        className="mt-2 p-2 bg-blue-500 text-white rounded-md"
      >
        Post Comment
      </button>
    </form>
  );
};

export default ReplyForm;
