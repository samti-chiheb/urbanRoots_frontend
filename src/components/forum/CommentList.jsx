import CommentItem from "./CommentItem";
import useComments from "../../hooks/forumHooks/useComments";
import { useParams } from "react-router-dom";

const CommentList = () => {
  const { postId } = useParams();
  const {
    comments,
    isLoading: commentsLoading,
    error,
  } = useComments(postId);
  return (
    <div className="space-y-4">
      {comments?.map((comment, i) => (
        <CommentItem key={i} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
