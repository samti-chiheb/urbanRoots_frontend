import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Urban Roots</h1>
        <nav>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/forums" className="mr-4">
            Forums
          </Link>
          <Link to="/profile" className="mr-4">
            Profile
          </Link>
          <Link to="/gadner-panel" className="mr-4">
            Jardinier
          </Link>
          <Link to="/admin-panel" className="mr-4">
            Admin
          </Link>
          {!auth ? (
            <>
              <Link to="/register" className="mr-4">
                Register
              </Link>
              <Link to="/login" className="mr-4">
                Login
              </Link>
            </>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={signOut}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
