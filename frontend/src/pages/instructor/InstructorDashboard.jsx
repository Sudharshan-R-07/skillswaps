
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  BookOpen,
  Users,
  Plus,
  TrendingUp,
  Clock,
  Eye,
  Edit,
  Trash2,
  X,
} from "lucide-react";

export default function InstructorDashboard() {
  const [showForm, setShowForm] = useState(false);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React JS Complete Course",
      category: "Web Development",
      students: 42,
      status: "Published",
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      category: "Programming",
      students: 28,
      status: "Published",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      category: "Web Development",
      students: 0,
      status: "Draft",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    category: "Web Development",
    description: "",
    level: "Beginner",
    price: "Free",
  });

  const totalStudents = courses.reduce(
    (sum, course) => sum + course.students,
    0
  );

  const handleCreateCourse = (e) => {
    e.preventDefault();

    const newCourse = {
      id: Date.now(),
      ...form,
      students: 0,
      status: "Draft",
    };

    setCourses((prev) => [newCourse, ...prev]);

    setForm({
      title: "",
      category: "Web Development",
      description: "",
      level: "Beginner",
      price: "Free",
    });

    setShowForm(false);
    alert("Course created successfully! (Demo only)");
  };

  const deleteCourse = (id) => {
    if (window.confirm("Delete this course?")) {
      setCourses((prev) => prev.filter((course) => course.id !== id));
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-indigo-600">
                RESOURCE PERSON PORTAL
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Instructor Dashboard
              </h1>
              <p className="mt-2 text-slate-500">
                Manage your courses and track your learners.
              </p>
            </div>

            <button
              onClick={() => setShowForm(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={20} />
              Create Course
            </button>
          </div>

          {/* Statistics */}
          <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Courses",
                value: courses.length,
                icon: BookOpen,
                color: "bg-indigo-100 text-indigo-600",
              },
              {
                title: "Total Students",
                value: totalStudents,
                icon: Users,
                color: "bg-emerald-100 text-emerald-600",
              },
              {
                title: "Published Courses",
                value: courses.filter((c) => c.status === "Published").length,
                icon: TrendingUp,
                color: "bg-blue-100 text-blue-600",
              },
              {
                title: "Draft Courses",
                value: courses.filter((c) => c.status === "Draft").length,
                icon: Clock,
                color: "bg-orange-100 text-orange-600",
              },
            ].map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <div className={`mb-4 inline-flex rounded-xl p-3 ${stat.color}`}>
                    <Icon size={22} />
                  </div>

                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <h2 className="mt-1 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </h2>
                </div>
              );
            })}
          </div>

          {/* Course Table */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900">
                My Courses
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage and monitor your course content.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-sm text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Students</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-slate-50">
                      <td className="px-6 py-5">
                        <p className="font-semibold text-slate-900">
                          {course.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          {course.category}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {course.students}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            course.status === "Published"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex gap-3">
                          <button
                            title="Preview"
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            title="Edit"
                            onClick={() =>
                              alert("Edit course will be added next.")
                            }
                            className="text-slate-600 hover:text-indigo-600"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            title="Delete"
                            onClick={() => deleteCourse(course.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Create Course Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    Create New Course
                  </h2>

                  <button
                    onClick={() => setShowForm(false)}
                    className="rounded-lg p-2 hover:bg-slate-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreateCourse} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Course Title
                    </label>
                    <input
                      required
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      placeholder="Enter course title"
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    >
                      <option>Web Development</option>
                      <option>Programming</option>
                      <option>Data Science</option>
                      <option>Cloud Computing</option>
                      <option>UI/UX Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Description
                    </label>
                    <textarea
                      required
                      rows="4"
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Describe what students will learn..."
                      className="w-full rounded-xl border border-slate-300 px-4 py-3"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Level
                      </label>
                      <select
                        value={form.level}
                        onChange={(e) =>
                          setForm({ ...form, level: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3 py-3"
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Price
                      </label>
                      <select
                        value={form.price}
                        onChange={(e) =>
                          setForm({ ...form, price: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-300 px-3 py-3"
                      >
                        <option>Free</option>
                        <option>Credits</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
                  >
                    Create Course
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
