import useAxiosPrivate from "../useAxiosPrivate";
import {
  createForum,
  updateForum,
  deleteForum,
} from "../../services/api/forumService";

const useForumActions = () => {
  const axiosPrivate = useAxiosPrivate();

  const createNewForum = async (forumData) => {
    return await createForum(forumData, axiosPrivate);
  };

  const updateExistingForum = async (id, forumData) => {
    return await updateForum(id, forumData, axiosPrivate);
  };

  const deleteExistingForum = async (id) => {
    return await deleteForum(id, axiosPrivate);
  };

  return { createNewForum, updateExistingForum, deleteExistingForum };
};

export default useForumActions;