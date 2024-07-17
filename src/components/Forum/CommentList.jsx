import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
  return (
    <div className="space-y-4">
      {comments?.map((comment, i) => (
        <CommentItem key={i} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
