import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Urban Roots</h1>
        <nav>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/register" className="mr-4">
            Register
          </Link>
          <Link to="/login" className="mr-4">
            Login
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
