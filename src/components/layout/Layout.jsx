import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto flex-grow p-4">
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
