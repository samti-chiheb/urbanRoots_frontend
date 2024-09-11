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

// gadren pages
import GardenListAndMap from "./pages/garden/GardenListAndMap";
import AddGarden from "./pages/garden/AddGarden";
import UpdateGarden from "./pages/garden/UpdateGarden";

// exchanges pages
import ExchangeList from "./pages/exchange/ExchangeList";
import ExchangeDetails from "./pages/exchange/ExchangeDetails";
import ExchangeForm from "./pages/exchange/ExchangeForm";
import Conversations from "./pages/messages/Conversations";
import MessageExchange from "./pages/messages/MessageExchange";

// other pages
import AdminPanel from "./pages/AdminPanel";

import Unauthorized from "./pages/Unauthorized";
import MissingPage from "./pages/MissingPage";
import PresistLogin from "./components/PresistLogin";
import UnderConstruction from "./pages/UnderConstruction";

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
          <Route path="/exchange/:id" element={<ExchangeDetails />} />
          <Route path="/exchanges" element={<ExchangeList />} />

          {/* user protected routes */}
          <Route element={<RequireAuth allowedRoles={[1009]} />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-garden" element={<AddGarden />} />
            <Route path="/update-garden/:gardenId" element={<UpdateGarden />} />

            {/* Protected exchange routes */}
            <Route path="/create-exchange" element={<ExchangeForm />} />
            <Route path="/edit-exchange/:id" element={<ExchangeForm />} />

            {/* Protected messaging routes */}
            <Route path="/messages" element={<UnderConstruction />} />
            <Route
              path="/messages/exchange/:exchangeId"
              element={<UnderConstruction />}
            />
            {/* <Route path="/messages" element={<Conversations />} />
            <Route
              path="/messages/exchange/:exchangeId"
              element={<MessageExchange />}
            /> */}
          </Route>

          {/* admin protected routes */}
          <Route element={<RequireAuth allowedRoles={[9009]} />}>
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
