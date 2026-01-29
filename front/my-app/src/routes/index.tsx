import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Scores from "../pages/Scores/Scores";
import ScoreDetails from "../pages/ScoreDetails/ScoreDetails";
import NewScore from "../pages/NewScore/NewScore";
import EditScore from "../pages/EditScore/EditScore";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/scores" element={<Scores />} />
      <Route path="/scores/new" element={<NewScore />} />
      <Route path="/scores/:id" element={<ScoreDetails />} />
      <Route path="/scores/edit/:id" element={<EditScore />} /> {}
    </Routes>
  );
}
