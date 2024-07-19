import { Link } from "react-router-dom";
import { ChatAltIcon, HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/solid";
import useAuth from "../../hooks/useAuth";
import usePostActions from "../../hooks/forumHooks/usePostActions";

const PostItem = ({ post, likeMutation, dislikeMutation }) => {
  const isModified = post.createdAt !== post.updatedAt;
  const { auth } = useAuth();
  const { likeExistingPost, dislikeExistingPost } = usePostActions();
  const userLiked = auth?.userInfo?.id && post.likes.includes(auth.userInfo.id);

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
    <div className=" border border-gray-300 rounded-md ">
      <Link
        to={`/forums/posts/${post._id}`}
        className="block p-4 hover:bg-gray-100"
      >
        <h2 className="text-xl font-bold ">{post.title}</h2>
        <p className="text-gray-700 py-4">{post.content}</p>
      </Link>
      <div className="flex p-4 flex-col sm:flex-row justify-between">
        <p className="text-gray-500 text-sm">
          {isModified ? "Modifier le" : "Créer le"} :{" "}
          {new Date(
            isModified ? post.updatedAt : post.createdAt
          ).toLocaleDateString()}{" "}
          par @{post.author.username}
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
    </div>
  );
};

export default PostItem;
