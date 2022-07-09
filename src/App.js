import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ForgotPassword from "./pages/auth/forgotPasswod";
import ResetPassword from "./pages/auth/resetPassword";
import Detail from "./pages/detail";
import Booking from "./pages/booking";
import Payment from "./pages/payment";
import ViewAll from "./pages/viewall";
import Profile from "./pages/profile";
import History from "./pages/history";
import Ticket from "./pages/ticket";
import Managemovie from "./pages/admin/manageMovie";
import Manageschedule from "./pages/admin/manageSchedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewall" element={<ViewAll />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/auth/reset-password/:otp" element={<ResetPassword />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
        <Route path="/ticket/:bookingId" element={<Ticket />} />
        <Route path="/managemovie" element={<Managemovie />} />
        <Route path="/manageschedule" element={<Manageschedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
