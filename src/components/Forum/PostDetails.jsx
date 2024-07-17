import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForum } from "../../contexts/ForumProvider";
import CommentList from "./CommentList";
import ReplyForm from "./ReplyForm";
import { getPostById } from "../../services/api/postService";
import { getCommentsByPost } from "../../services/api/commentService";

const PostDetail = () => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();
  const [comments, setComments] = useState();

  useEffect(() => {
    const initComponent = async () => {
      try {
        setLoading(true);
        const postRes = await getPostById(postId);
        setPost(postRes);
        const commentsRes = await getCommentsByPost(postId);
        setComments(commentsRes);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    initComponent();
  }, [postId]);

  return (
    <div className="container mx-auto p-4">
      <h1>POST DETAILS</h1>
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <p className="text-gray-700 mb-4">{post?.description}</p>
      <h2 className="text-2xl font-bold mb-2">Comments</h2>
      <CommentList comments={comments} />
      <ReplyForm postId={postId} />
    </div>
  );
};

export default PostDetail;
