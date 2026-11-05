
import { useState } from "react";
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
} from "lucide-react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const courseData = [
  {
    id: 1,
    title: "Complete React Developer",
    instructor: "Alex Morgan",
    category: "Development",
    level: "Beginner",
    duration: "12 hours",
    students: 2400,
    rating: 4.9,
    color: "from-indigo-500 to-blue-600",
    icon: Code2,
    description: "Learn React from fundamentals to advanced concepts.",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Chen",
    category: "Design",
    level: "Beginner",
    duration: "8 hours",
    students: 1800,
    rating: 4.8,
    color: "from-purple-500 to-pink-500",
    icon: Palette,
    description: "Master design principles and create beautiful interfaces.",
  },
  {
    id: 3,
    title: "Python Data Analytics",
    instructor: "David Wilson",
    category: "Data Science",
    level: "Intermediate",
    duration: "15 hours",
    students: 3100,
    rating: 4.9,
    color: "from-emerald-500 to-teal-600",
    icon: Database,
    description: "Analyze data using Python, Pandas, and visualization.",
  },
  {
    id: 4,
    title: "Digital Marketing Basics",
    instructor: "Emily Johnson",
    category: "Business",
    level: "Beginner",
    duration: "6 hours",
    students: 1200,
    rating: 4.7,
    color: "from-orange-500 to-red-500",
    icon: Briefcase,
    description: "Learn SEO, social media marketing, and digital strategy.",
  },
  {
    id: 5,
    title: "Full Stack Web Development",
    instructor: "Michael Brown",
    category: "Development",
    level: "Intermediate",
    duration: "20 hours",
    students: 4200,
    rating: 4.9,
    color: "from-cyan-500 to-blue-600",
    icon: Code2,
    description: "Build complete applications using frontend and backend.",
  },
  {
    id: 6,
    title: "Advanced Figma Design",
    instructor: "Olivia Davis",
    category: "Design",
    level: "Advanced",
    duration: "10 hours",
    students: 900,
    rating: 4.8,
    color: "from-fuchsia-500 to-purple-600",
    icon: Palette,
    description: "Create professional prototypes and design systems.",
  },
];

const categories = ["All", "Development", "Design", "Data Science", "Business"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function Courses() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Levels");

  const filteredCourses = courseData.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || course.category === category;

    const matchesLevel =
      level === "All Levels" || course.level === level;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Header */}
        <section className="bg-white px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <p className="font-semibold text-indigo-600">LEARNING LIBRARY</p>

            <h1 className="mt-3 text-4xl font-bold text-slate-900">
              Explore Courses
            </h1>

            <p className="mt-4 max-w-2xl text-slate-500">
              Discover courses, learn new skills, and take your knowledge
              to the next level.
            </p>

            {/* Search */}
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

        {/* Catalog */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Filters */}
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
                  <option key={item}>{item}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setLevel("All Levels");
                }}
                className="mt-5 w-full rounded-lg border border-slate-200 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Reset Filters
              </button>
            </aside>

            {/* Course Cards */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-500">
                  Showing <strong>{filteredCourses.length}</strong> courses
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => {
                  const Icon = course.icon;

                  return (
                    <article
                      key={course.id}
                      className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div
                        className={`flex h-44 items-center justify-center bg-gradient-to-br ${course.color} text-white`}
                      >
                        <Icon size={60} strokeWidth={1.5} />
                      </div>

                      <div className="p-5">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                          {course.category}
                        </span>

                        <h3 className="mt-4 text-lg font-bold text-slate-900">
                          {course.title}
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                          By {course.instructor}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1 text-amber-500">
                            <Star size={14} fill="currentColor" />
                            {course.rating}
                          </span>

                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {course.students.toLocaleString()}
                          </span>

                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {course.duration}
                          </span>
                        </div>

                        <div className="mt-4 text-xs font-medium text-slate-500">
                          {course.level}
                        </div>

                        <Link
                          to={`/courses/${course.id}`}
                          className="mt-5 block rounded-xl bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                          View Course
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {filteredCourses.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white py-20 text-center">
                  <BookOpen className="mx-auto text-slate-300" size={48} />
                  <h3 className="mt-4 text-xl font-bold text-slate-800">
                    No courses found
                  </h3>
                  <p className="mt-2 text-slate-500">
                    Try another search or category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
