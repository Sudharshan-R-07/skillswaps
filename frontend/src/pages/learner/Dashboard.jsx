
import { useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";

import {
  Home,
  BookOpen,
  Award,
  Settings,
  Search,
  Bell,
  Menu,
  TrendingUp,
  Clock,
  ArrowRight,
  LogOut,
  UserCircle,
} from "lucide-react";

const enrolledCourses = [
  {
    title: "Complete React Developer",
    instructor: "Alex Morgan",
    progress: 65,
    lessons: "13 / 20 lessons",
    color: "bg-indigo-600",
  },
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Chen",
    progress: 35,
    lessons: "7 / 20 lessons",
    color: "bg-purple-600",
  },
  {
    title: "Python Data Analytics",
    instructor: "David Wilson",
    progress: 80,
    lessons: "16 / 20 lessons",
    color: "bg-emerald-600",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const firstName = user?.displayName?.split(" ")[0] || "Learner";

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Mobile Header */}
      <div className="flex items-center justify-between border-b bg-white px-5 py-4 lg:hidden">
        <h1 className="text-xl font-bold text-indigo-600">SkillSwap</h1>

        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>
      </div>

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white p-6 transition-transform lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h1 className="mb-10 hidden text-2xl font-bold text-indigo-600 lg:block">
            SkillSwap
          </h1>

          <div className="flex items-center gap-3 rounded-xl bg-indigo-50 p-3">
            <UserCircle size={35} className="text-indigo-600" />

            <div>
              <p className="font-semibold">{firstName}</p>
              <p className="text-xs text-slate-500">Learner Account</p>
            </div>
          </div>

          <nav className="mt-8 space-y-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white"
            >
              <Home size={18} />
              Dashboard
            </Link>

            <Link
              to="/courses"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
            >
              <BookOpen size={18} />
              Browse Courses
            </Link>

            <Link
              to="/skills"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
            >
              <TrendingUp size={18} />
              Skill Exchange
            </Link>

            <Link
              to="/certificates"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
            >
              <Award size={18} />
              Certificates
            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-600 hover:bg-slate-100"
            >
              <Settings size={18} />
              Settings
            </Link>
          </nav>

          <button
            onClick={handleLogout}
            className="absolute bottom-8 flex items-center gap-3 px-4 text-sm text-red-500 hover:text-red-700"
          >
            <LogOut size={18} />
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-5 sm:p-8">

          {/* Topbar */}
          <div className="mb-10 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Learner Dashboard</p>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Welcome back, {firstName}! 👋
              </h2>
              <p className="mt-2 text-slate-500">
                Continue your learning journey today.
              </p>
            </div>

            <div className="hidden items-center gap-4 sm:flex">
              <Link
                to="/courses"
                className="flex items-center gap-2 rounded-xl border bg-white px-4 py-3 text-sm"
              >
                <Search size={17} />
                Explore
              </Link>

              <button className="rounded-xl border bg-white p-3">
                <Bell size={18} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Enrolled Courses"
              value="6"
              icon={<BookOpen size={22} />}
              color="bg-indigo-50 text-indigo-600"
            />

            <StatCard
              title="Completed Courses"
              value="2"
              icon={<Award size={22} />}
              color="bg-emerald-50 text-emerald-600"
            />

            <StatCard
              title="Learning Hours"
              value="48"
              icon={<Clock size={22} />}
              color="bg-purple-50 text-purple-600"
            />

            <StatCard
              title="Skill Credits"
              value="250"
              icon={<TrendingUp size={22} />}
              color="bg-orange-50 text-orange-600"
            />
          </div>

          {/* Courses */}
          <section className="mt-10">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-bold">Continue Learning</h3>

              <Link
                to="/courses"
                className="flex items-center gap-2 text-sm font-semibold text-indigo-600"
              >
                View all <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-5 xl:grid-cols-2">
              {enrolledCourses.map((course) => (
                <div
                  key={course.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase text-indigo-600">
                        Course
                      </p>

                      <h4 className="mt-2 text-lg font-bold">
                        {course.title}
                      </h4>

                      <p className="mt-2 text-sm text-slate-500">
                        Instructor: {course.instructor}
                      </p>
                    </div>

                    <BookOpen className="text-slate-300" size={25} />
                  </div>

                  <div className="mt-6 flex justify-between text-sm">
                    <span className="text-slate-500">{course.lessons}</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${course.color}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <Link
                    to="/courses/1"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600"
                  >
                    Continue learning <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Learning Activity */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-bold">Learning Activity</h3>

            <div className="mt-6 space-y-5">
              <Activity
                title="Completed React Components lesson"
                time="Today · 30 minutes ago"
              />

              <Activity
                title="Completed Python Data Analysis lesson"
                time="Yesterday · 2 hours ago"
              />

              <Activity
                title="Enrolled in UI/UX Design Fundamentals"
                time="2 days ago"
              />
            </div>
          </section>

          {/* Recommendation */}
          <section className="mt-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <h3 className="text-2xl font-bold">
              Ready to learn something new?
            </h3>

            <p className="mt-3 max-w-xl text-indigo-100">
              Discover new courses, connect with mentors, and expand your skills.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Explore Courses <ArrowRight size={17} />
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className={`inline-flex rounded-xl p-3 ${color}`}>
        {icon}
      </div>

      <p className="mt-5 text-sm text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </div>
  );
}

function Activity({ title, time }) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />

      <div>
        <p className="text-sm font-medium text-slate-800">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{time}</p>
      </div>
    </div>
  );
}
