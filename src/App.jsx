// required
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";

// layout
import Layout from "./components/layout/Layout";

// pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import InteractiveMap from "./pages/InteractiveMap";
import MissingPage from "./pages/MissingPage";
import AdminPanel from "./pages/AdminPanel";
import Unauthorized from "./pages/Unauthorized";
import PresistLogin from "./components/PresistLogin";
import Forums from "./pages/forum/Forums";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PresistLogin />}>
          {/* public routes  */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forums/*" element={<Forums />} />
          <Route path="/map" element={<InteractiveMap />} />

          {/* user protected routes */}
          <Route element={<RequireAuth allowedRoles={[9009]} />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* admin protected routes */}
          <Route element={<RequireAuth allowedRoles={[1009]} />}>
            <Route path="/admin-panel" element={<AdminPanel />} />
          </Route>

          {/* unauthorized page */}
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* catch all routes */}
          <Route path="/*" element={<MissingPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
