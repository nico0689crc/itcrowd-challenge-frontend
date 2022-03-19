import { Route, Routes, Navigate } from "react-router-dom";
import { pages } from "./pages";

const RoutesContainer = () => {
  const routes = (
    <Routes>
      <Route path="/" element={pages.home} />
      <Route path="/admin" element={pages.admin} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );

  return routes;
};

export default RoutesContainer;
