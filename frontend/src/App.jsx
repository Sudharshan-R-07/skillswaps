
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/learner/Dashboard";
import Courses from "./pages/courses/Courses";
import CourseDetails from "./pages/courses/CourseDetails";
import Skills from "./pages/skills/Skills";
import SkillProfile from "./pages/skills/SkillProfile";
import Profile from "./pages/learner/Profile";
import Notifications from "./pages/learner/Notifications";
import ResourcePersonApplication from "./pages/skills/ResourcePersonApplication";
import Settings from "./pages/learner/Settings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Messages from "./pages/messages/Messages";
import Bookings from "./pages/bookings/Bookings";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import LearningPlayer from "./pages/learner/LearningPlayer";
import Quiz from "./pages/learner/Quiz";
import Certificates from "./pages/learner/Certificates";
import Wallet from "./pages/learner/Wallet";
import Marketplace from "./pages/marketplace/Marketplace";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/skills/:id" element={<SkillProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route
  path="/resource-person"
  element={<ResourcePersonApplication />}
/>
<Route path="/settings" element={<Settings />} />
<Route path="/admin" element={<AdminDashboard />} />
<Route path="/messages" element={<Messages />} />
<Route path="/bookings" element={<Bookings />} />
<Route
  path="/instructor"
  element={<InstructorDashboard />}
/>
<Route path="/learn/:courseId" element={<LearningPlayer />} />
<Route path="/quiz/:courseId" element={<Quiz />} />
<Route path="/certificates" element={<Certificates />} />
<Route path="/wallet" element={<Wallet />} />
<Route path="/marketplace" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  );
}
