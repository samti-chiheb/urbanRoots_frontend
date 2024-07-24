import { ChatAltIcon, HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import useAuth from "../../hooks/useAuth";
import usePost from "../../hooks/forumHooks/usePost";
import usePosts from "../../hooks/forumHooks/usePosts";

const PostInteraction = ({ postId }) => {
  const { auth } = useAuth();
  const { post } = usePost(postId);
  const { dislikeMutation, likeMutation } = usePosts(post?.forum._id);

  const userLiked =
    auth?.userInfo?.id && post?.likes.includes(auth.userInfo.id);
  const isModified = post?.createdAt !== post?.updatedAt;

  const toggleLike = async () => {
    try {
      if (!post._id) return;

      if (userLiked) {
        dislikeMutation.mutate(post._id);
      } else {
        likeMutation.mutate(post._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex p-4 flex-col sm:flex-row justify-between">
      <p className="text-gray-500 text-sm">
        {isModified ? "Modifier le" : "Créer le"} :{" "}
        {new Date(
          isModified ? post?.updatedAt : post?.createdAt
        ).toLocaleDateString()}{" "}
        par @{post?.author.username}
      </p>
      <div className="flex items-center space-x-4">
        <div className="flex items-center text-gray-500">
          <ChatAltIcon className="w-5 h-5 mr-1" />
          <span>{post?.commentsCount}</span>
        </div>
        <div
          className="flex items-center text-red-500 cursor-pointer hover:bg-red-50 rounded-full p-2"
          onClick={toggleLike}
        >
          {userLiked ? (
            <HeartIconSolid className="w-5 h-5 mr-1" />
          ) : (
            <HeartIcon className="w-5 h-5 mr-1" />
          )}
          <span>{post?.likes?.length}</span>
        </div>
      </div>
    </div>
  );
};

export default PostInteraction;
