
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Users, ArrowRight, Sparkles } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const mentors = [
  {
    id: 1,
    name: "Arun Kumar",
    role: "Frontend Developer",
    skills: ["React", "JavaScript", "Tailwind CSS"],
    wants: ["UI/UX Design", "Python"],
    credits: 50,
    rating: 4.9,
    exchanges: 24,
    category: "Development",
    initials: "AK",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "UI/UX Designer",
    skills: ["Figma", "UI Design", "Prototyping"],
    wants: ["React", "Node.js"],
    credits: 40,
    rating: 4.8,
    exchanges: 18,
    category: "Design",
    initials: "PS",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: 3,
    name: "Rahul Verma",
    role: "Data Analyst",
    skills: ["Python", "SQL", "Power BI"],
    wants: ["Web Development"],
    credits: 60,
    rating: 5.0,
    exchanges: 31,
    category: "Data Science",
    initials: "RV",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 4,
    name: "Meera Nair",
    role: "Java Developer",
    skills: ["Java", "Spring Boot", "MySQL"],
    wants: ["Cloud Computing", "AWS"],
    credits: 45,
    rating: 4.7,
    exchanges: 15,
    category: "Development",
    initials: "MN",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 5,
    name: "Karthik Raj",
    role: "Cloud Engineer",
    skills: ["AWS", "Docker", "Kubernetes"],
    wants: ["React", "UI Design"],
    credits: 70,
    rating: 4.9,
    exchanges: 29,
    category: "Cloud",
    initials: "KR",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 6,
    name: "Ananya Das",
    role: "Graphic Designer",
    skills: ["Photoshop", "Illustrator", "Canva"],
    wants: ["Python", "Data Analytics"],
    credits: 35,
    rating: 4.8,
    exchanges: 12,
    category: "Design",
    initials: "AD",
    color: "bg-purple-100 text-purple-700",
  },
];

const categories = [
  "All",
  "Development",
  "Design",
  "Data Science",
  "Cloud",
];

export default function Skills() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredMentors = mentors.filter((mentor) => {
    const text = [
      mentor.name,
      mentor.role,
      ...mentor.skills,
      ...mentor.wants,
    ].join(" ").toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());
    const matchesCategory =
      category === "All" || mentor.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-slate-950 px-6 py-16 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-2 text-sm text-indigo-300">
              <Sparkles size={16} />
              Learn together. Grow together.
            </div>

            <h1 className="mt-6 text-4xl font-bold md:text-5xl">
              Skill Exchange Marketplace
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Share what you know, learn what you love, and connect with
              students who want to grow together.
            </p>

            {/* Search */}
            <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-xl bg-white px-4 py-4 text-slate-900">
              <Search size={20} className="text-slate-400" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search React, Python, Figma, AWS..."
                className="w-full outline-none"
              />
            </div>
          </div>
        </section>

        {/* Marketplace */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  category === item
                    ? "bg-indigo-600 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Discover Skill Partners
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                {filteredMentors.length} skill partners available
              </p>
            </div>

            <Link
              to="/dashboard"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              My Dashboard
            </Link>
          </div>

          {/* Mentor Cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredMentors.map((mentor) => (
              <article
                key={mentor.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Profile */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold ${mentor.color}`}
                  >
                    {mentor.initials}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {mentor.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {mentor.role}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
                      <Star size={14} fill="currentColor" />
                      {mentor.rating}
                      <span className="ml-1 text-slate-400">
                        ({mentor.exchanges} exchanges)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills offered */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Skills Offered
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {mentor.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills wanted */}
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Wants to Learn
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {mentor.wants.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Credits */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs text-slate-500">Exchange value</p>
                    <p className="mt-1 font-bold text-slate-900">
                      {mentor.credits} Skill Credits
                    </p>
                  </div>

                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Users size={14} />
                    {mentor.exchanges}
                  </span>
                </div>

                <Link
                  to={`/skills/${mentor.id}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  View Profile <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {filteredMentors.length === 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white py-20 text-center">
              <Search size={40} className="mx-auto text-slate-300" />

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                No skill partners found
              </h3>

              <p className="mt-2 text-slate-500">
                Try searching another skill or category.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 font-semibold text-indigo-600"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="mx-6 mb-12 rounded-3xl bg-indigo-600 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">
            Have a skill to share?
          </h2>

          <p className="mt-4 text-indigo-100">
            Become a skill partner and help other students learn.
          </p>

          <Link
            to="/resource-person"
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Become a Mentor
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
