import useComments from "../../hooks/forumHooks/useComments";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  PencilIcon,
  TrashIcon,
  ThumbUpIcon,
  ThumbDownIcon,
} from "@heroicons/react/solid";

const CommentItem = ({ comment }) => {
  const { postId } = useParams();
  const { auth } = useAuth();
  const userId = auth?.userInfo?.id;

  const {
    updateCommentMutation: updateComment,
    deleteCommentMutation: deleteComment,
    upvoteCommentMutation: upvoteComment,
    downvoteCommentMutation: downvoteComment,
  } = useComments(postId);

  const handleUpvote = () => {
    upvoteComment.mutate(comment._id);
  };

  const handleDownvote = () => {
    downvoteComment.mutate(comment._id);
  };

  const handleDelete = () => {
    deleteComment.mutate(comment._id);
    console.log("deleted", comment._id);
  };

  const handleUpdate = () => {
    // Logique pour mettre à jour le commentaire
    // Vous pouvez ouvrir un modal ou utiliser un champ de texte pour éditer le commentaire
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md w-[75%]">
      <p className="text-gray-700">{comment.content}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-500 text-sm">{comment.author.username}</span>
        <div className="flex space-x-2">
          {userId === comment.author._id && (
            <>
              <button
                onClick={handleUpdate}
                className="text-gray-400 flex items-center"
              >
                <PencilIcon className="w-5 h-5 mr-1" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 flex items-center"
              >
                <TrashIcon className="w-5 h-5 mr-1" />
              </button>
            </>
          )}
          <button
            onClick={handleDownvote}
            className="text-red-500 flex items-center"
          >
            <ThumbDownIcon className="w-5 h-5 mr-1" />
          </button>
          <button
            onClick={handleUpvote}
            className="text-blue-500 flex items-center"
          >
            <ThumbUpIcon className="w-5 h-5 mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
