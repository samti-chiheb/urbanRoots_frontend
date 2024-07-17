import { Routes, Route } from "react-router-dom";
import ForumOverview from "./ForumOverview";
import PostList from "./PostList";
import PostDetails from "./PostDetails";
import CreatePostForm from "./CreatePostForm";
import ReplyForm from "./ReplyForm";
import { ForumProvider } from "../../contexts/ForumProvider";
import RequireAuth from "../../auth/RequireAuth";
import CategoryForums from "./CategoryForums";

const Forums = () => {
  return (
    <ForumProvider>
      <div className="forum-container">
        <Routes>
          <Route path="/" element={<ForumOverview />} />
          <Route path="/:forumId/posts" element={<PostList />} />
          <Route path="/posts/:postId" element={<PostDetails />} />
          <Route path="/:categoryId" element={<CategoryForums />} />
          <Route element={<RequireAuth allowedRoles={[9009, 4509, 1009]} />}>
            <Route path="/create-post/:forumId" element={<CreatePostForm />} />
            <Route path="/posts/:postId/reply" element={<ReplyForm />} />
          </Route>
        </Routes>
      </div>
    </ForumProvider>
  );
};

export default Forums;
