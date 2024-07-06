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
        </nav>
      </div>
    </header>
  );
};

export default Header;