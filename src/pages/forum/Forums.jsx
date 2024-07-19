import { Routes, Route } from "react-router-dom";
import ForumList from "./ForumList";
import PostList from "./PostList";
import PostDetails from "./PostDetails";
import CreatePostForm from "./CreatePostForm";
import ReplyForm from "../../components/Forum/ReplyForm";
import RequireAuth from "../../auth/RequireAuth";

const Forums = () => {
  return (
    <div className="forum-container">
      <Routes>
        <Route path="/" element={<ForumList />} />
        <Route path="/:forumId/posts" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route element={<RequireAuth allowedRoles={[9009, 4509, 1009]} />}>
          <Route path="/:forumId/create-post" element={<CreatePostForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Forums;
