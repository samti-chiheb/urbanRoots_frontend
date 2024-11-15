import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaSignOutAlt,
  FaUser,
  FaHome,
  FaSeedling,
  FaComments,
  FaUserShield,
  FaExchangeAlt,
  FaEnvelope,
} from "react-icons/fa";

const Header = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const signOut = async () => {
    await logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const getActiveClass = (path) => {
    return window.location.pathname === path
      ? "text-indigo-600 font-bold"
      : "text-gray-700";
  };

  return (
    <header className="fixed top-0 w-full bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 z-50 shadow-lg">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer text-gray-800 dark:text-white"
        >
          Urban Roots
        </h1>
        <div className="flex items-center lg:order-2">
          {!auth ? (
            <>
              <Link
                to="/register"
                onClick={closeMenu}
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Register
              </Link>
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Login
              </Link>
            </>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4 flex items-center"
              onClick={() => {
                signOut();
                closeMenu();
              }}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          )}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`lg:flex flex-col lg:flex-row lg:items-center w-full lg:w-auto lg:order-1 transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className={`flex items-center block py-2 pr-4 pl-3 ${getActiveClass(
                  "/"
                )} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
              >
                <FaHome className="mr-2" /> Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/forums"
                onClick={closeMenu}
                className={`flex items-center block py-2 pr-4 pl-3 ${getActiveClass(
                  "/forums"
                )} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
              >
                <FaComments className="mr-2" /> Forums
              </Link>
            </li>
            <li>
              <Link
                to="/gardens"
                onClick={closeMenu}
                className={`flex items-center block py-2 pr-4 pl-3 ${getActiveClass(
                  "/gardens"
                )} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
              >
                <FaSeedling className="mr-2" /> Jardins
              </Link>
            </li>
            <li>
              <Link
                to="/exchanges"
                onClick={closeMenu}
                className={`flex items-center block py-2 pr-4 pl-3 ${getActiveClass(
                  "/exchanges"
                )} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
              >
                <FaExchangeAlt className="mr-2" /> Echanges
              </Link>
            </li>
            {auth?.roles?.includes(1009) && (
              <>
                <li>
                  <Link
                    to="/messages"
                    onClick={closeMenu}
                    className={`flex items-center block py-2 pr-4 pl-3 ${getActiveClass(
                      "/messages"
                    )} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
                  >
                    <FaEnvelope className="mr-2" /> Conversations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className={`flex items-center block py-2 pr-4 pl-3 ${getActiveClass(
                      "/profile"
                    )} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
                  >
                    <FaUser className="mr-2" />
                    {auth?.userInfo?.username}
                  </Link>
                </li>
              </>
            )}
            {auth?.roles?.includes(9009) && (
              <li>
                <Link
                  to="/admin-panel"
                  onClick={closeMenu}
                  className={`flex items-center block py-2 pr-4 pl-3 ${getActiveClass(
                    "/admin-panel"
                  )} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700`}
                >
                  <FaUserShield className="mr-2" /> Admin
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
