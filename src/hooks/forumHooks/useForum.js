import { useQuery } from "@tanstack/react-query";
import { getOneForumById } from "../../services/api/forumService";
import handleApiErrors from "../../utils/handleApiErrors";

const useForum = (forumId) => {
  return useQuery({
    queryKey: ["forum", forumId],
    queryFn: () => getOneForumById(forumId),
    enabled: !!forumId,
    onError: handleApiErrors,
  });
};

export default useForum;
