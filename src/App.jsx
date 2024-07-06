import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import InteractiveMap from "./pages/InteractiveMap.jsx";
import ExchangePlatform from "./pages/ExchangePlatform.jsx";
import CommunityForums from "./pages/CommunityForums.jsx";
import EducationalModules from "./pages/EducationalModules.jsx";
import EnvironmentalTracking from "./pages/EnvironmentalTracking.jsx";
import MissingPage from "./pages/MissingPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/map" element={<InteractiveMap />} />
        <Route path="/exchange" element={<ExchangePlatform />} />
        <Route path="/forums" element={<CommunityForums />} />
        <Route path="/education" element={<EducationalModules />} />
        <Route path="/tracking" element={<EnvironmentalTracking />} />
        <Route path="/*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
