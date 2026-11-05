
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Menu,
  X,
  ArrowRight,
  Bell,
  Settings,
  MessageCircle,
  CalendarDays,
  Award,
  Wallet,
  Store,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Demo notification count
  const unreadCount = 3;

  // Demo role (replace with actual backend role later)
  const role = user?.role || "LEARNER";

  const dashboardPath =
    role === "ADMIN"
      ? "/admin"
      : role === "RESOURCE_PERSON"
      ? "/instructor"
      : "/dashboard";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Skill Exchange", path: "/skills" },
    { name: "Marketplace", path: "/marketplace" },
  ];

  const accountLinks = [
    { name: "Profile", path: "/profile", icon: User },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Messages", path: "/messages", icon: MessageCircle },
    { name: "Bookings", path: "/bookings", icon: CalendarDays },
    { name: "Certificates", path: "/certificates", icon: Award },
    { name: "Wallet", path: "/wallet", icon: Wallet },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const closeMenus = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeMenus();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenus}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <BookOpen size={22} />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Skill<span className="text-indigo-600">Swap</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop User Actions */}
        <div className="hidden items-center gap-4 md:flex">

          {user ? (
            <>
              {/* Dashboard */}
              <Link
                to={dashboardPath}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              {/* Notification */}
              <Link
                to="/notifications"
                className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                aria-label="Notifications"
              >
                <Bell size={21} />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 transition hover:bg-slate-50"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                    {user.displayName?.charAt(0)?.toUpperCase() ||
                      user.email?.charAt(0)?.toUpperCase() ||
                      "U"}
                  </div>

                  <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                    {user.displayName || "My Account"}
                  </span>

                  <ChevronDown size={16} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">

                    {/* User Info */}
                    <div className="border-b border-slate-100 px-3 py-3">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.displayName || "SkillSwap User"}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                      <span className="mt-2 inline-block rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600">
                        {role.replace("_", " ")}
                      </span>
                    </div>

                    {/* Dropdown Links */}
                    <div className="py-2">
                      {accountLinks.map((link) => {
                        const Icon = link.icon;

                        return (
                          <Link
                            key={link.path}
                            to={link.path}
                            onClick={closeMenus}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <Icon size={17} />
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg border-t border-slate-100 px-3 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg md:hidden">

          {/* Main Links */}
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenus}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <>
              <div className="my-3 border-t border-slate-100" />

              <Link
                to={dashboardPath}
                onClick={closeMenus}
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-semibold text-indigo-600 hover:bg-indigo-50"
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              {accountLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-slate-700 hover:bg-indigo-50"
                  >
                    <Icon size={18} />
                    {link.name}
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className="mt-3 flex w-full items-center gap-3 rounded-lg border-t border-slate-100 px-4 py-4 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </>
          ) : (
            <div className="mt-4 flex gap-3 border-t border-slate-100 pt-4">
              <Link
                to="/login"
                onClick={closeMenus}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-center font-semibold text-slate-700"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenus}
                className="flex-1 rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
