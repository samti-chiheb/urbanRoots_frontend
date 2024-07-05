import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import InteractiveMap from "./pages/InteractiveMap";
import ExchangePlatform from "./pages/ExchangePlatform";
import CommunityForums from "./pages/CommunityForums";
import EducationalModules from "./pages/EducationalModules";
import EnvironmentalTracking from "./pages/EnvironmentalTracking";
import Review from "./pages/Review";
import MissingPage from "./pages/MissingPage";

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
        <Route path="/review" element={<Review />} />
        <Route path="/*" element={<MissingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
