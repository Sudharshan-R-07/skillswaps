
import { Link } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/AuthContext";
import {
  BookOpen,
  Users,
  Award,
  Clock,
  ArrowRight,
  PlayCircle,
  TrendingUp,
  Search,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  const { user, profile } = useAuth();

  const stats = [
    {
      title: "Enrolled Courses",
      value: "0",
      icon: BookOpen,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Skills Learned",
      value: "0",
      icon: Award,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "Learning Hours",
      value: "0",
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Skill Exchanges",
      value: "0",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const quickActions = [
    {
      title: "Explore Courses",
      description: "Discover courses and start learning new skills.",
      icon: BookOpen,
      link: "/courses",
      color: "bg-indigo-600",
    },
    {
      title: "Skill Exchange",
      description: "Connect with learners and exchange knowledge.",
      icon: Users,
      link: "/skills",
      color: "bg-emerald-600",
    },
    {
      title: "Marketplace",
      description: "Explore services offered by skilled learners.",
      icon: Sparkles,
      link: "/marketplace",
      color: "bg-purple-600",
    },
  ];

  const displayName =
    profile?.displayName ||
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Learner";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Welcome Hero */}
        <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 px-5 py-12 text-white sm:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm text-indigo-100">
                  <Sparkles size={15} />
                  Learner Dashboard
                </span>

                <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                  Welcome back, {displayName}!
                </h1>

                <p className="mt-3 max-w-xl text-indigo-100">
                  Your learning journey starts here. Discover new skills,
                  connect with learners, and grow every day.
                </p>

                <Link
                  to="/courses"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
                >
                  Explore Courses
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="hidden h-32 w-32 items-center justify-center rounded-3xl bg-white/10 md:flex">
                <BookOpen size={65} strokeWidth={1.3} />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Content */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
          {/* Statistics */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-xl p-3 ${stat.color}`}>
                      <Icon size={22} />
                    </div>

                    <TrendingUp size={18} className="text-slate-300" />
                  </div>

                  <p className="mt-5 text-sm text-slate-500">{stat.title}</p>

                  <h2 className="mt-1 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Quick Actions
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  What would you like to do today?
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
              >
                Go Home
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.title}
                    to={action.link}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${action.color}`}
                    >
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {action.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {action.description}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                      Explore
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Learning Progress Empty State */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Continue Learning
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Your enrolled courses will appear here.
                </p>
              </div>

              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Browse Courses
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <PlayCircle size={32} />
              </div>

              <h3 className="mt-5 font-semibold text-slate-800">
                No courses enrolled yet
              </h3>

              <p className="mt-2 max-w-md text-sm text-slate-500">
                Start your learning journey by exploring courses and enrolling
                in the skills you want to master.
              </p>

              <Link
                to="/courses"
                className="mt-5 inline-flex items-center gap-2 font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Find your first course
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Discover Skills */}
          <div className="mt-10 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-7 text-white sm:p-9">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  Learn together. Grow together.
                </h2>

                <p className="mt-2 max-w-xl text-emerald-100">
                  Exchange your knowledge with other learners and discover
                  opportunities to develop new skills.
                </p>
              </div>

              <Link
                to="/skills"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
              >
                <Search size={18} />
                Discover Skills
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
