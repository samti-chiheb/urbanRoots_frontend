import { Routes, Route } from "react-router-dom";
import ForumList from "./ForumList";
import PostList from "./PostList";
import PostDetails from "./PostDetails";
import CreatePostForm from "./CreatePostForm";
import RequireAuth from "../../auth/RequireAuth";
import ForumForm from "./ForumForm";

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
        <Route element={<RequireAuth allowedRoles={[9009]} />}>
          <Route path="/create-forum" element={<ForumForm />} />
          <Route path="/:forumId/update" element={<ForumForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Forums;
