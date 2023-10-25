import { Route, Routes } from "react-router-dom";
import HomePage from "../../presentation/screens/user/home/Home";
import Profile from "../../presentation/screens/user/home/Profile";
import LiveCorner from "../../presentation/screens/user/home/LiveCorner";
import Login from "../../presentation/screens/user/auth/Login";
import Register from "../../presentation/screens/user/auth/Register";
import ForgotPassword from "../../presentation/screens/user/auth/ForgotPassword";
import RegisterOtp from "../../presentation/screens/user/auth/RegisterOtp";
import ForgotPasswordOtp from "../../presentation/screens/user/auth/ForgotPasswordOtp";
import ResetPassword from "../../presentation/screens/user/auth/ResetPassword";
import Auth from "../../presentation/components/user/auth/Auth";
// import Users from "../../presentation/screens/admin/Users";\

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />}>
        <Route index path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="register-otp" element={<RegisterOtp />} />
        <Route path="forgot-password-otp" element={<ForgotPasswordOtp />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/admin/*" element={<HomePage />}></Route>
     
      <Route path="/*" element={<HomePage />}></Route>
    </Routes>
  );
};

export default MainRoutes;
