import { Link } from "react-router-dom";
import PostInteraction from "./PostInteraction";

const PostItem = ({ post }) => {
  return (
    <div className=" border border-gray-300 rounded-md ">
      <Link
        to={`/forums/posts/${post._id}`}
        className="block p-4 hover:bg-gray-100"
      >
        <h2 className="text-xl font-bold ">{post.title}</h2>
        <p className="text-gray-700 py-4">{post.content}</p>
      </Link>
      <PostInteraction postId={post._id} />
    </div>
  );
};

export default PostItem;
