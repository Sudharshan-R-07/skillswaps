
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Activity,
  ShieldCheck
} from "lucide-react";

const initialApplications = [
  {
    id: 1,
    name: "Arun Kumar",
    expertise: "React Development",
    experience: "2 years",
    status: "Pending"
  },
  {
    id: 2,
    name: "Priya Sharma",
    expertise: "UI/UX Design",
    experience: "3 years",
    status: "Pending"
  },
  {
    id: 3,
    name: "Rahul",
    expertise: "Python Programming",
    experience: "1 year",
    status: "Pending"
  }
];

const users = [
  { id: 1, name: "Sudharshan", email: "student@example.com", role: "Learner" },
  { id: 2, name: "Arun Kumar", email: "arun@example.com", role: "Resource Person" },
  { id: 3, name: "Priya Sharma", email: "priya@example.com", role: "Learner" },
  { id: 4, name: "Rahul", email: "rahul@example.com", role: "Learner" }
];

export default function AdminDashboard() {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const approveApplication = (id) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "Approved" } : app
      )
    );
  };

  const rejectApplication = (id) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: "Rejected" } : app
      )
    );
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    {
      title: "Total Users",
      value: "1,248",
      change: "+12%",
      icon: Users,
      color: "bg-indigo-100 text-indigo-600"
    },
    {
      title: "Active Courses",
      value: "86",
      change: "+8%",
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Resource Persons",
      value: "142",
      change: "+15%",
      icon: GraduationCap,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Enrollments",
      value: "3,560",
      change: "+18%",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-7xl">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-indigo-600">
                <ShieldCheck size={20} />
                <span className="text-sm font-semibold">ADMIN PANEL</span>
              </div>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Dashboard Overview
              </h1>

              <p className="mt-2 text-slate-500">
                Manage your SkillSwap platform.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <span className="text-sm font-medium text-slate-600">
                Administrator
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["overview", "users", "applications"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-5 py-3 text-sm font-semibold capitalize ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {tab === "applications"
                  ? "Resource Person Applications"
                  : tab}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === "overview" && (
            <>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(stat => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.title}
                      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <div className={`rounded-xl p-3 ${stat.color}`}>
                          <Icon size={24} />
                        </div>

                        <span className="text-sm font-semibold text-green-600">
                          {stat.change}
                        </span>
                      </div>

                      <p className="mt-5 text-sm text-slate-500">
                        {stat.title}
                      </p>

                      <h2 className="mt-2 text-3xl font-bold text-slate-900">
                        {stat.value}
                      </h2>
                    </div>
                  );
                })}
              </div>

              {/* Activity */}
              <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <Activity className="text-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-900">
                    Recent Platform Activity
                  </h2>
                </div>

                <div className="mt-6 space-y-5">
                  {[
                    ["New learner registered", "Sudharshan joined SkillSwap", "10 minutes ago"],
                    ["Course enrollment", "A learner enrolled in React Development", "1 hour ago"],
                    ["Resource Person application", "New application received", "2 hours ago"],
                    ["Course published", "JavaScript Fundamentals published", "Yesterday"]
                  ].map(([title, description, time]) => (
                    <div key={title} className="flex gap-4">
                      <div className="mt-1 h-3 w-3 rounded-full bg-indigo-500" />
                      <div>
                        <h3 className="font-medium text-slate-800">{title}</h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {description}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">{time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {/* Users */}
          {activeTab === "users" && (
            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">
                User Management
              </h2>

              <div className="relative mt-5 max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search users..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 outline-none focus:border-indigo-500"
                />
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead>
                    <tr className="border-b text-sm text-slate-500">
                      <th className="pb-4">Name</th>
                      <th className="pb-4">Email</th>
                      <th className="pb-4">Role</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="border-b last:border-0">
                        <td className="py-4 font-medium text-slate-800">
                          {user.name}
                        </td>
                        <td className="py-4 text-slate-500">{user.email}</td>
                        <td className="py-4">
                          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredUsers.length === 0 && (
                  <p className="py-8 text-center text-slate-500">
                    No users found.
                  </p>
                )}
              </div>
            </section>
          )}

          {/* Resource Person Applications */}
          {activeTab === "applications" && (
            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-slate-900">
                Resource Person Applications
              </h2>

              <div className="mt-6 space-y-4">
                {applications.map(app => (
                  <div
                    key={app.id}
                    className="rounded-xl border border-slate-200 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {app.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {app.expertise} · {app.experience}
                        </p>

                        <span className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          app.status === "Approved"
                            ? "bg-green-50 text-green-700"
                            : app.status === "Rejected"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        }`}>
                          {app.status === "Approved" && <CheckCircle size={13} />}
                          {app.status === "Rejected" && <XCircle size={13} />}
                          {app.status === "Pending" && <Clock size={13} />}
                          {app.status}
                        </span>
                      </div>

                      {app.status === "Pending" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveApplication(app.id)}
                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() => rejectApplication(app.id)}
                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
