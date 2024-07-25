import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "../../utils/validationSchema";
import CommentList from "../../components/forum/CommentList";
import ReplyForm from "../../components/forum/ReplyForm";
import usePost from "../../hooks/forumHooks/usePost";
import PostInteraction from "../../components/forum/PostInteraction";
import {
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
} from "@heroicons/react/solid";
import useAuth from "../../hooks/useAuth";

const PostDetail = () => {
  const { postId } = useParams();
  const {
    post,
    postLoading,
    postError,
    updatePostMutation,
    deletePostMutation,
  } = usePost(postId);
  const { auth } = useAuth();
  const userId = auth?.userInfo?.id;
  const [isEditingPost, setIsEditingPost] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("content", post.content);
    }
  }, [post, setValue]);

  const handleUpdatePost = (data) => {
    updatePostMutation.mutate(
      {
        postId,
        postData: data,
      },
      {
        onSuccess: () => {
          setIsEditingPost(false);
        },
      }
    );
  };

  const handleDeletePost = () => {
    deletePostMutation.mutate(postId, {
      onSuccess: () => {
        navigate("/forums");
      },
    });
  };

  const handleEditPostClick = () => {
    setIsEditingPost(true);
  };

  const handleCancelEditPost = () => {
    setIsEditingPost(false);
    setValue("title", post?.title);
    setValue("content", post?.content);
  };

  if (postLoading) return <div>Loading...</div>;
  if (postError) return <div>Error loading post</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      {isEditingPost ? (
        <form
          onSubmit={handleSubmit(handleUpdatePost)}
          className="flex flex-col space-y-2 mb-4"
        >
          <input
            type="text"
            {...register("title")}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Titre du post"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <textarea
            {...register("content")}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Contenu du post"
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
          <div className="flex space-x-2">
            <button type="submit" className="text-green-500 flex items-center">
              <CheckIcon className="w-5 h-5 mr-1" />
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelEditPost}
              className="text-gray-500 flex items-center"
            >
              <XIcon className="w-5 h-5 mr-1" />
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
          <p className="text-gray-700 mb-4">{post?.content}</p>
          {userId === post?.author._id && (
            <div className="flex space-x-2 mb-4">
              <button
                onClick={handleEditPostClick}
                className="text-gray-400 flex items-center"
              >
                <PencilIcon className="w-5 h-5 mr-1" />
                Edit
              </button>
              <button
                onClick={handleDeletePost}
                className="text-red-500 flex items-center"
              >
                <TrashIcon className="w-5 h-5 mr-1" />
                Delete
              </button>
            </div>
          )}
        </>
      )}
      <PostInteraction postId={postId} />
      <h2 className="text-2xl font-bold mb-2">Commentaire :</h2>
      <CommentList />
      <ReplyForm postId={postId} />
    </div>
  );
};

export default PostDetail;