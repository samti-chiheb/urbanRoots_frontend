import { useState } from "react";
import useComments from "../../hooks/forumHooks/useComments";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
} from "@heroicons/react/outline";
import {
  PencilIcon,
  TrashIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  CheckIcon,
  XIcon,
  ArrowCircleUpIcon as ArrowCircleUpIconSolid,
  ArrowCircleDownIcon as ArrowCircleDownIconSolid,
} from "@heroicons/react/solid";

const CommentItem = ({ comment }) => {
  const { postId } = useParams();
  const { auth } = useAuth();
  const userId = auth?.userInfo?.id;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(comment.content);

  const {
    updateCommentMutation: updateComment,
    deleteCommentMutation: deleteComment,
    upvoteCommentMutation: upvoteComment,
    downvoteCommentMutation: downvoteComment,
  } = useComments(postId);

  const userUpvoted = comment.upvotes.includes(userId);
  const userDownvoted = comment.downvotes.includes(userId);
  const voteScore = comment.upvotes.length - comment.downvotes.length;

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
    if (!updatedContent) return;

    updateComment.mutate(
      { commentId: comment._id, commentData: { content: updatedContent } },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedContent(comment.content);
  };

  return (
    <div className="p-4 border bg-white border-gray-300 rounded-md w-[75%]">
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="text-green-500 flex items-center"
            >
              <CheckIcon className="w-5 h-5 mr-1" />
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="text-gray-500 flex items-center"
            >
              <XIcon className="w-5 h-5 mr-1" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">{comment.content}</p>
      )}
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-500 text-sm">{comment.author.username}</span>
        <div className="flex space-x-2">
          {userId === comment.author._id && !isEditing && (
            <>
              <button
                onClick={handleEditClick}
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
          {/* Vote Btns */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleUpvote}
              className={`flex items-center hover:bg-green-50 p-1 rounded-full ${
                userUpvoted ? "text-green-500" : "text-gray-500"
              }`}
            >
              {userUpvoted ? (
                <ArrowCircleUpIconSolid className="w-5 h-5" />
              ) : (
                <ArrowCircleUpIcon className="w-5 h-5" />
              )}
            </button>
            <span>{voteScore}</span>
            <button
              onClick={handleDownvote}
              className={`flex items-center hover:bg-red-50 p-1 rounded-full ${
                userDownvoted ? "text-red-500" : "text-gray-500"
              }`}
            >
              {userDownvoted ? (
                <ArrowCircleDownIconSolid className="w-5 h-5" />
              ) : (
                <ArrowCircleDownIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
