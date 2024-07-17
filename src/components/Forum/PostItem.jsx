import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
  return (
    <Link
      to={`/forums/posts/${post._id}`}
      className="block p-4 border border-gray-300 rounded-md hover:bg-gray-100"
    >
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700">{post.description}</p>
    </Link>
  );
};

export default PostItem;
