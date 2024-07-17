import { createContext, useContext, useState, useEffect } from "react";
import { getPostsByForum } from "../services/api/postService";
import { getCommentsByPost } from "../services/api/commentService";
import handleApiErrors from "../utils/handleApiErrors";

const ForumContext = createContext();

export const useForum = () => {
  return useContext(ForumContext);
};

export const ForumProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostsByForum = async (forumId) => {
    setLoading(true);
    try {
      const response = await getPostsByForum(forumId);
      setPosts(response);
    } catch (err) {
      handleApiErrors(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommentsByPost = async (postId) => {
    setLoading(true);
    try {
      const response = await getCommentsByPost(postId);
      setComments(response);
    } catch (err) {
      handleApiErrors(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForumContext.Provider
      value={{
        posts,
        comments,
        loading,
        fetchPostsByForum,
        fetchCommentsByPost,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};
