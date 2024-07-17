import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostItem from "./PostItem";
import SortFilterOptions from "./SortFilterOptions";
import { getPostsByForum } from "../../services/api/postService";
import { getOneForumById } from "../../services/api/forumService";

const PostList = () => {
  const { forumId } = useParams();
  const [posts, setPosts] = useState([]);
  const [forum, setForum] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPostsByForum = async () => {
      try {
        setLoading(true);
        const forumRes = await getOneForumById(forumId);
        const postRes = await getPostsByForum(forumId);
        setPosts(postRes);
        setForum(forumRes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        console.log(posts);
      }
    };
    fetchPostsByForum();
  }, [forumId]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{forum?.title || "Forum"}</h1>
      <button onClick={() => console.log(posts)}>test</button>
      <SortFilterOptions />
      <div
        className={`relative p-2 transition-transform duration-300 transform space-y-4`}
      >
        {posts?.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
