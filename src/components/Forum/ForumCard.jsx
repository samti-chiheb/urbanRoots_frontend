import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostsByForum } from "../../services/api/postService";

const ForumCard = ({ forum }) => {
  const postNum = 3;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initComponent = async () => {
      try {
        const postsRes = await getPostsByForum(forum._id);
        setPosts(postsRes);
      } catch (error) {
        handleApiErrors(error);
      } finally {
        setLoading(false);
      }
    };

    initComponent();
  }, [forum._id]);

  return (
    <div className=" border border-gray-300 rounded-md flex flex-col justify-between">
      <div className="flex flex-col">
        <Link
          to={`/forums/${forum._id}/posts`}
          className="bg-green-50 p-4 border-b"
        >
          <h2 className="text-xl font-bold">{forum.title}</h2>
          <p className="text-gray-600 mt-2">{forum.description}</p>
        </Link>

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
