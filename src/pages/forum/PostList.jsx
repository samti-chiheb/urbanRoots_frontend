import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../../components/forum/PostItem";
import { getOneForumById } from "../../services/api/forumService";
import { PlusCircleIcon, SearchIcon } from "@heroicons/react/outline";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import usePosts from "../../hooks/forumHooks/usePosts";

const PostList = () => {
  const { auth } = useAuth();
  const { forumId } = useParams();
  const navigate = useNavigate();
  const { posts, isLoading } = usePosts(forumId);

  const [forum, setForum] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    const fetchPostsByForum = async () => {
      try {
        const forumRes = await getOneForumById(forumId);
        setForum(forumRes);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPostsByForum();
  }, [forumId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (e) => {
    if (e.target.value === "my-posts" && !auth?.userInfo?.id) {
      return toast.error("Vous devez être connecté pour voir Vos posts.");
    }
    setFilterBy(e.target.value);
  };

  const filteredPosts = posts
    ?.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((post) => {
      if (filterBy === "my-posts") {
        return post.author._id === auth?.userInfo?.id;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "most-liked":
          return b.likes.length - a.likes.length;
        case "most-commented":
          return b.commentsCount - a.commentsCount;
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-start justify-between  mb-4 md:flex-row md:items-center gap-2">
        <h1 className="text-3xl font-bold">{forum?.title || "Forum"}</h1>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/forums/${forumId}/create-post`)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2" />
          Créer un post
        </button>
      </div>
      <div className="mb-4 relative w-full md:w-8/12 ">
        <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          className="border p-2 pl-10 w-full"
          placeholder="Rechercher des posts..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="sort" className="mr-2">
            Trier par :
          </label>
          <select
            id="sort"
            className="border border-gray-300 p-2 rounded-md"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="oldest">De plus ancien au plus récent</option>
            <option value="newest">De plus récent au plus ancien</option>
            <option value="most-liked">Le plus liké</option>
            <option value="most-commented">Le plus commenté</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter" className="mr-2">
            Filtrer :
          </label>
          <select
            id="filter"
            className="border border-gray-300 p-2 rounded-md"
            value={filterBy}
            onChange={handleFilterChange}
          >
            <option value="all">Tous</option>
            <option value="my-posts">Mes Posts</option>
          </select>
        </div>
      </div>

      <div
        className={`relative p-2 transition-transform duration-300 transform space-y-4`}
      >
        {isLoading ? (
          "Chargement ..."
        ) : filteredPosts.length === 0 ? (
          <p className="text-center p-6 text-2xl text-gray-400">
            Aucun Post trouvé.
          </p>
        ) : (
          filteredPosts?.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default PostList;
