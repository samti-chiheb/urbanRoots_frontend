import { useParams } from "react-router-dom";
import CommentList from "../../components/Forum/CommentList";
import ReplyForm from "../../components/Forum/ReplyForm";
import usePost from "../../hooks/forumHooks/usePost";

const PostDetail = () => {
  const { postId } = useParams();

  const { post, isLoading, error, likeMutation, dislikeMutation } =
    usePost(postId);


  return (
    <div className="container mx-auto p-4">
      <h1>POST DETAILS</h1>
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <p className="text-gray-700 mb-4">{post?.content}</p>
      <h2 className="text-2xl font-bold mb-2">Comments</h2>
      <CommentList />
      <ReplyForm postId={postId} />
    </div>
  );
};

export default PostDetail;
