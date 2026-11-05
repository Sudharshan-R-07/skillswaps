
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Star,
  Clock,
  Users,
  BookOpen,
  Code2,
  Palette,
  Database,
  Briefcase,
  Filter,
  Loader2,
  AlertCircle,
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../api/api";

const categories = [
  "All",
  "Development",
  "Design",
  "Data Science",
  "Business",
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const getCourseIcon = (category = "") => {
  const value = category.toLowerCase();

  if (value.includes("design")) return Palette;
  if (value.includes("data")) return Database;
  if (value.includes("business")) return Briefcase;

  return Code2;
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Levels");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch real courses from backend / MongoDB
  useEffect(() => {
    let active = true;

    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/courses");

        // Supports common backend response structures
        const fetchedCourses =
          response.data?.courses ??
          response.data?.data?.courses ??
          response.data?.data ??
          [];

        if (!Array.isArray(fetchedCourses)) {
          throw new Error("Invalid courses response from server.");
        }

        if (active) {
          // Only backend data is displayed; no local mock data
          setCourses(fetchedCourses);
        }
      } catch (err) {
        if (active) {
          setCourses([]);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load courses."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchCourses();

    return () => {
      active = false;
    };
  }, []);

  // Search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const title = course.title || "";
      const instructor =
        course.instructor?.name ||
        course.instructorName ||
        course.instructor ||
        "";

      const courseCategory = course.category || "Development";
      const courseLevel = course.level || "Beginner";

      const matchesSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        String(instructor).toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || courseCategory === category;

      const matchesLevel =
        level === "All Levels" || courseLevel === level;

      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, search, category, level]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setLevel("All Levels");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* HEADER */}
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <p className="font-semibold text-indigo-600">
              LEARNING LIBRARY
            </p>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              Explore Courses
            </h1>

            <p className="mt-4 max-w-2xl text-slate-500">
              Discover courses, learn new skills, and take your
              knowledge to the next level.
            </p>

            {/* SEARCH */}
            <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Search className="text-slate-400" size={20} />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses or instructors..."
                className="w-full outline-none"
              />
            </div>
          </div>
        </section>

        {/* COURSE CATALOG */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* FILTERS */}
            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:w-64">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Filter size={18} />
                Filters
              </div>

              <h3 className="mt-6 text-sm font-semibold text-slate-700">
                Categories
              </h3>

              <div className="mt-3 space-y-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                      category === item
                        ? "bg-indigo-50 font-semibold text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <h3 className="mt-6 text-sm font-semibold text-slate-700">
                Difficulty
              </h3>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
              >
                {levels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <button
                onClick={resetFilters}
                className="mt-5 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Reset Filters
              </button>
            </aside>

            {/* COURSE RESULTS */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <strong>{filteredCourses.length}</strong> courses
                </p>
              </div>

              {/* LOADING */}
              {loading && (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20">
                  <Loader2
                    size={40}
                    className="animate-spin text-indigo-600"
                  />
                  <p className="mt-4 text-slate-500">
                    Fetching courses from database...
                  </p>
                </div>
              )}

              {/* ERROR */}
              {!loading && error && (
                <div className="rounded-2xl border border-red-200 bg-white py-16 text-center">
                  <AlertCircle
                    size={45}
                    className="mx-auto text-red-500"
                  />
                  <h3 className="mt-4 text-xl font-bold text-slate-800">
                    Unable to load courses
                  </h3>
                  <p className="mt-2 px-5 text-sm text-red-500">
                    {error}
                  </p>

                  <button
                    onClick={() => window.location.reload()}
                    className="mt-5 rounded-lg bg-indigo-600 px-5 py-3 text-white"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* COURSE CARDS */}
              {!loading && !error && (
                <>
                  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredCourses.map((course) => {
                      const Icon = getCourseIcon(course.category);

                      const instructor =
                        course.instructor?.name ||
                        course.instructorName ||
                        course.instructor ||
                        "SkillSwap Instructor";

                      const courseId = course._id || course.id;

                      return (
                        <article
                          key={courseId}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                        >
                          {/* COURSE IMAGE */}
                          {course.thumbnail || course.image ? (
                            <img
                              src={course.thumbnail || course.image}
                              alt={course.title}
                              className="h-44 w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-44 items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
                              <Icon size={60} strokeWidth={1.5} />
                            </div>
                          )}

                          <div className="p-5">
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                              {course.category || "Development"}
                            </span>

                            <h3 className="mt-4 text-lg font-bold text-slate-900">
                              {course.title}
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                              By {instructor}
                            </p>

                            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                              <span className="flex items-center gap-1 text-amber-500">
                                <Star size={14} fill="currentColor" />
                                {course.rating || "New"}
                              </span>

                              <span className="flex items-center gap-1">
                                <Users size={14} />
                                {Number(course.students || 0).toLocaleString()}
                              </span>

                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {course.duration || "Self-paced"}
                              </span>
                            </div>

                            <div className="mt-4 text-xs font-medium text-slate-500">
                              {course.level || "Beginner"}
                            </div>

                            <Link
                              to={`/courses/${courseId}`}
                              className="mt-5 block rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                              View Course
                            </Link>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* EMPTY DATABASE / FILTER RESULTS */}
                  {filteredCourses.length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
                      <BookOpen
                        className="mx-auto text-slate-300"
                        size={48}
                      />

                      <h3 className="mt-4 text-xl font-bold text-slate-800">
                        No courses found
                      </h3>

                      <p className="mt-2 text-slate-500">
                        {courses.length === 0
                          ? "No courses are available in the database yet."
                          : "Try another search or category."}
                      </p>

                      <button
                        onClick={resetFilters}
                        className="mt-5 rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
