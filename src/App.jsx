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
import ExchangePlatform from "./pages/ExchangePlatform";
import CommunityForums from "./pages/CommunityForums";
import EducationalModules from "./pages/EducationalModules";
import EnvironmentalTracking from "./pages/EnvironmentalTracking";
import MissingPage from "./pages/MissingPage";
import GardnerPanel from "./pages/GardnerPanel";
import AdminPanel from "./pages/AdminPanel";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        {/* public routes  */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* user protected routes */}
        <Route element={<RequireAuth allowedRoles={[9009]} />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/exchange" element={<ExchangePlatform />} />
          <Route path="/forums" element={<CommunityForums />} />
          <Route path="/education" element={<EducationalModules />} />
          <Route path="/tracking" element={<EnvironmentalTracking />} />
        </Route>
        
        {/* gardner protected routes */}
        <Route element={<RequireAuth allowedRoles={[4509]} />}>
          <Route path="/gadner-panel" element={<GardnerPanel />} />
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
    </Routes>
  );
}

export default App;
