import { Routes, Route } from "react-router-dom";
import Signin from "../components/signin.component";
import SetPassword from "../components/google-set-password";
import ProtectedRoute from "../components/protectecRoutes";

const TheSignin = () => {
  return (
    <Routes>
      <Route index element={<Signin />} />
      <Route
        path="setpassword"
        element={
          <ProtectedRoute>
            <SetPassword />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};
export default TheSignin;
