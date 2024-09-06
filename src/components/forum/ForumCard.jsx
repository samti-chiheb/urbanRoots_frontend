import { Link } from "react-router-dom";
import usePosts from "../../hooks/forumHooks/usePosts";
import { FaTrash, FaEdit } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useForums from "../../hooks/forumHooks/useForums";
import { useNavigate } from "react-router-dom";

const ForumCard = ({ forum }) => {
  const postNum = 3;
  const { posts } = usePosts(forum._id);
  const { auth } = useAuth();
  const { deleteForumMutation } = useForums();
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteForumMutation.mutate(forum._id);
  };
  const HandleUpdate = () => {
    navigate(`/forums/${forum._id}/update`);
  };

  return (
    <div className=" border border-gray-300 rounded-md flex flex-col justify-between">
      <div className="flex flex-col">
        <div className="bg-green-50 p-4 border-b">
          <div className="flex justify-between space-x-2">
            <Link to={`/forums/${forum._id}/posts`}>
              <h2 className="text-xl font-bold">{forum.title}</h2>
            </Link>

            {auth?.roles?.includes(9009) && (
              <div>
                <button
                  onClick={HandleUpdate}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={handleDelete}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            )}
          </div>
          <p className="text-gray-600 mt-2">{forum.description}</p>
        </div>

        <ul className="px-4 divide-y divide-gray-200 mt-2">
          <p className="py-2">Posts :</p>
          {posts?.map(
            (post, i) =>
              i < postNum && (
                <li
                  key={post._id}
                  className="flex items-center p-3 hover:bg-blue-50 transition-colors duration-200"
                >
                  <Link to={`/forums/posts/${post._id}`}>
                    <span className="text-gray-800 hover:text-gray-700">
                      {post.title}
                    </span>
                  </Link>
                </li>
              )
          )}
        </ul>
      </div>

      <div className="mt-4 p-4 border-t bg-blue-50 border-gray-300 text-sm">
        <h3 className="text-md font-bold">Categories</h3>
        <div className="flex flex-wrap">
          {forum.categories?.map((category) => (
            <p key={category._id} className={`w-auto p-2 rounded`}>
              {category.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForumCard;
