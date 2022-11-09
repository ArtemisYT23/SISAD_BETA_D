import { Route, Routes } from "react-router-dom";
import ContentFound from "./ContentFound";

function RoutesNotFound({ children }) {
  return (
    <Routes>
      {children}
      <Route path="*" element={<ContentFound />} />
    </Routes>
  );
}

export default RoutesNotFound;
