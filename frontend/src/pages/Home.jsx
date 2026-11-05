
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Code2,
  Palette,
  Database,
  BriefcaseBusiness,
  Star,
  Users,
  BookOpen,
  GraduationCap,
  Zap,
  Play,
  CheckCircle2,
} from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const categories = [
  { name: "Web Development", icon: Code2, courses: "120+ courses", color: "bg-blue-50 text-blue-600" },
  { name: "UI/UX Design", icon: Palette, courses: "80+ courses", color: "bg-purple-50 text-purple-600" },
  { name: "Data Science", icon: Database, courses: "65+ courses", color: "bg-emerald-50 text-emerald-600" },
  { name: "Business", icon: BriefcaseBusiness, courses: "45+ courses", color: "bg-orange-50 text-orange-600" },
];

const courses = [
  {
    title: "Complete React Developer",
    instructor: "Alex Morgan",
    category: "Development",
    rating: "4.9",
    students: "2.4k",
    price: "Free",
    color: "from-indigo-500 to-blue-600",
    icon: Code2,
  },
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Chen",
    category: "Design",
    rating: "4.8",
    students: "1.8k",
    price: "Free",
    color: "from-purple-500 to-pink-500",
    icon: Palette,
  },
  {
    title: "Data Analytics with Python",
    instructor: "David Wilson",
    category: "Data Science",
    rating: "4.9",
    students: "3.1k",
    price: "Free",
    color: "from-emerald-500 to-teal-600",
    icon: Database,
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-white">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo-100 blur-3xl opacity-60" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-100 blur-3xl opacity-60" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
                <Zap size={15} />
                Your skills. Your future.
              </div>

              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Learn skills.
                <span className="block text-indigo-600">Share knowledge.</span>
                <span className="block">Grow together.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Discover courses, learn from passionate mentors, and exchange
                skills with a community that grows together.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = "/courses";
                }}
                className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60 sm:flex-row"
              >
                <div className="flex flex-1 items-center gap-3 px-3">
                  <Search className="text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="What do you want to learn?"
                    className="w-full bg-transparent py-2 text-sm outline-none"
                  />
                </div>
                <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">
                  Search
                </button>
              </form>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-500">
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Learn at your pace</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> Community powered</span>
              </div>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/register" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700">
                  Start Learning <ArrowRight size={18} />
                </Link>
                <Link to="/courses" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 hover:bg-slate-50">
                  <Play size={17} /> Explore Courses
                </Link>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-indigo-100/70">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Your learning journey</p>
                    <h3 className="mt-1 text-xl font-bold text-slate-900">Keep growing 🚀</h3>
                  </div>
                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600"><GraduationCap size={25} /></div>
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 p-5 text-white">
                  <p className="text-sm text-indigo-100">Weekly progress</p>
                  <div className="mt-2 flex items-end justify-between">
                    <h2 className="text-3xl font-bold">72%</h2>
                    <span className="text-sm text-indigo-100">+18% this week</span>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white/20">
                    <div className="h-2 w-[72%] rounded-full bg-white" />
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    ["React Development", "8 of 12 lessons", "bg-indigo-500", "w-2/3"],
                    ["UI/UX Design", "5 of 8 lessons", "bg-purple-500", "w-3/5"],
                    ["Python Basics", "10 of 10 lessons", "bg-emerald-500", "w-full"],
                  ].map(([title, progress, color, width]) => (
                    <div key={title} className="flex items-center gap-3">
                      <div className={`rounded-xl ${color} p-3 text-white`}><BookOpen size={18} /></div>
                      <div className="flex-1">
                        <div className="flex justify-between gap-2">
                          <p className="text-sm font-semibold text-slate-800">{title}</p>
                          <span className="text-xs text-slate-500">{progress}</span>
                        </div>
                        <div className="mt-2 h-1.5 rounded-full bg-slate-100">
                          <div className={`h-1.5 rounded-full ${color} ${width}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -left-6 top-16 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-amber-50 p-3 text-amber-500"><Star fill="currentColor" size={18} /></div>
                  <div><p className="text-sm font-bold text-slate-900">4.9/5 Rating</p><p className="text-xs text-slate-500">Learner satisfaction</p></div>
                </div>
              </div>

              <div className="absolute -right-5 bottom-16 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-emerald-50 p-3 text-emerald-600"><Users size={18} /></div>
                  <div><p className="text-sm font-bold text-slate-900">Learn together</p><p className="text-xs text-slate-500">Community powered</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-slate-50 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-semibold text-indigo-600">EXPLORE TOPICS</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Find your learning path</h2>
                <p className="mt-3 text-slate-500">Explore skills that match your goals.</p>
              </div>
              <Link to="/courses" className="font-semibold text-indigo-600 hover:text-indigo-800">View all categories →</Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map(({ name, icon: Icon, courses: count, color }) => (
                <Link to="/courses" key={name} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
                  <div className={`inline-flex rounded-xl p-4 ${color}`}><Icon size={25} /></div>
                  <h3 className="mt-5 font-bold text-slate-900">{name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{count}</p>
                  <div className="mt-5 flex items-center justify-between text-sm font-semibold text-indigo-600">
                    Explore <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="font-semibold text-indigo-600">POPULAR COURSES</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Learn something new today</h2>
              <p className="mt-4 text-slate-500">Discover courses curated for your growth.</p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {courses.map(({ title, instructor, category, rating, students, price, color, icon: Icon }) => (
                <div key={title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <div className={`flex h-48 items-center justify-center bg-gradient-to-br ${color} text-white`}>
                    <Icon size={64} strokeWidth={1.5} />
                  </div>
                  <div className="p-6">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">{category}</span>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                    <p className="mt-2 text-sm text-slate-500">By {instructor}</p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1 text-amber-500"><Star size={15} fill="currentColor" /> {rating}</span>
                      <span>•</span>
                      <span>{students} learners</span>
                    </div>
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="font-bold text-emerald-600">{price}</span>
                      <Link to="/courses" className="font-semibold text-indigo-600 hover:text-indigo-800">View course →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">
                Browse all courses <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-indigo-50/60 py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <p className="font-semibold text-indigo-600">HOW IT WORKS</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">Your journey in three steps</h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                ["01", "Discover", "Explore courses and skills that match your interests."],
                ["02", "Learn & Exchange", "Learn from others and share what you know."],
                ["03", "Grow", "Track progress, earn certificates, and build confidence."],
              ].map(([number, title, description]) => (
                <div key={number} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold text-white">{number}</div>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-500">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-14 text-center text-white md:px-16">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to grow your skills?</h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-indigo-100">
              Join a community where everyone has something to teach and something to learn.
            </p>
            <Link to="/register" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-indigo-700 hover:bg-indigo-50">
              Join SkillSwap Today <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
