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
import MainHome from "../../presentation/screens/user/home/MainHome";
import PlayerView from "../../presentation/screens/user/home/PlayerView";
import Notification from "../../presentation/screens/user/home/Notification";
import ChatUI from "../../presentation/screens/user/home/Chat";
import SchedulesUser from "../../presentation/screens/user/home/SchedulesUser";
import HighlightViewUser from "../../presentation/screens/user/home/HighlightViewUser";
import Fans from "../../presentation/screens/admin/Fans";
import AddHighlights from "../../presentation/screens/admin/addHighlights";
import Players from "../../presentation/screens/admin/Players";
import Teams from "../../presentation/screens/admin/Teams";

import ManageSchedules from "../../presentation/screens/admin/manageSchedules";
import MainRecruit from "../../presentation/screens/admin/MainRecruit";
import LiveSetup from "../../presentation/screens/player/LiveSetup";
import Live from "../../presentation/screens/player/Live";
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

      <Route path="/" element={<HomePage />}>
        <Route path="/live-corner" element={<LiveCorner />} />
        <Route path="/player-view" element={<PlayerView />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/chat" element={<ChatUI />} />
        <Route path="/schedule-user" element={<SchedulesUser />} />
        <Route path="/view-highligh" element={<HighlightViewUser />} />
        <Route path="/fans" element={<Fans />} />
        <Route path="/Highlight" element={<AddHighlights />} />
        <Route path="/player" element={<Players />} />
        <Route path="/teams" element={<Teams />} />
        <Route path={"/stream"} element={<Live />} />

        <Route path="/recruit" element={<MainRecruit />} />

        <Route path="/schedules" element={<ManageSchedules />} />

        <Route path="/go-live" element={<LiveSetup />} />
      </Route>
      <Route path="/landing-page" element={<MainHome />}></Route>
    </Routes>
  );
};

export default MainRoutes;
