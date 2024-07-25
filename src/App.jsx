// required
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";

// layout
import Layout from "./components/layout/Layout";

// pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Forums from "./pages/forum/Forums";
import GardenListAndMap from "./pages/GardenListAndMap";
import AddGarden from "./pages/AddGarden";
import UpdateGarden from "./pages/UpdateGarden";
import AdminPanel from "./pages/AdminPanel";

import Unauthorized from "./pages/Unauthorized";
import MissingPage from "./pages/MissingPage";
import PresistLogin from "./components/PresistLogin";

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
          <Route path="/gardens" element={<GardenListAndMap />} />

          {/* user protected routes */}
          <Route element={<RequireAuth allowedRoles={[9009]} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-garden" element={<AddGarden />} />
            <Route path="/update-garden/:gardenId" element={<UpdateGarden />} />
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
