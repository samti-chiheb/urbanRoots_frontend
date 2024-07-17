
const CommentItem = ({ comment }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-md w-[75%]">
      <p className="text-gray-700">{comment.content}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-500 text-sm">{comment.author.username}</span>
        <div>
          <button className="mr-2 text-blue-500">Upvote</button>
          <button className="text-red-500">Downvote</button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;