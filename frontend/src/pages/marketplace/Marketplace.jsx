
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Search,
  Star,
  Clock,
  Coins,
  ShoppingBag,
  User,
  X,
  ArrowRight,
  Filter,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "React JS Mentoring",
    provider: "Arun Kumar",
    category: "Web Development",
    description:
      "Learn React components, hooks, state management, and build practical projects with personal guidance.",
    price: 50,
    duration: "60 minutes",
    rating: 4.9,
    reviews: 28,
    level: "Beginner",
    skills: ["React", "JavaScript", "Frontend"],
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "UI/UX Design Consultation",
    provider: "Priya Sharma",
    category: "UI/UX Design",
    description:
      "Improve your design skills with Figma, wireframes, user flows, and practical UI design feedback.",
    price: 40,
    duration: "45 minutes",
    rating: 4.8,
    reviews: 21,
    level: "Beginner",
    skills: ["Figma", "UI Design", "UX"],
    color: "from-pink-500 to-purple-600",
  },
  {
    id: 3,
    title: "Python Programming Guidance",
    provider: "Rahul Dev",
    category: "Programming",
    description:
      "Understand Python fundamentals, problem solving, functions, and beginner coding projects.",
    price: 35,
    duration: "60 minutes",
    rating: 4.7,
    reviews: 19,
    level: "Beginner",
    skills: ["Python", "Programming", "Logic"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "Cloud & DevOps Guidance",
    provider: "Vikram S",
    category: "Cloud Computing",
    description:
      "Explore Docker, Kubernetes, CI/CD pipelines, and deployment workflows through hands-on guidance.",
    price: 75,
    duration: "90 minutes",
    rating: 5.0,
    reviews: 15,
    level: "Intermediate",
    skills: ["Docker", "Kubernetes", "DevOps"],
    color: "from-orange-500 to-red-600",
  },
  {
    id: 5,
    title: "Java Interview Preparation",
    provider: "Karthik M",
    category: "Programming",
    description:
      "Practice Java concepts, OOP fundamentals, coding questions, and interview preparation.",
    price: 45,
    duration: "60 minutes",
    rating: 4.6,
    reviews: 12,
    level: "Intermediate",
    skills: ["Java", "OOP", "Interview"],
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 6,
    title: "Portfolio Review",
    provider: "Meena R",
    category: "Career Development",
    description:
      "Get feedback on your developer portfolio, projects, resume presentation, and career direction.",
    price: 30,
    duration: "30 minutes",
    rating: 4.8,
    reviews: 32,
    level: "All Levels",
    skills: ["Portfolio", "Resume", "Career"],
    color: "from-violet-500 to-indigo-600",
  },
];

const categories = [
  "All Categories",
  "Web Development",
  "Programming",
  "UI/UX Design",
  "Cloud Computing",
  "Career Development",
];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [maxPrice, setMaxPrice] = useState("all");
  const [selectedService, setSelectedService] = useState(null);

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(search.toLowerCase()) ||
      service.provider.toLowerCase().includes(search.toLowerCase()) ||
      service.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory =
      category === "All Categories" ||
      service.category === category;

    const matchesPrice =
      maxPrice === "all" || service.price <= Number(maxPrice);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-violet-800 px-4 py-16 text-white sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold tracking-widest text-indigo-200">
              SKILLSWAP MARKETPLACE
            </p>

            <h1 className="mt-4 max-w-2xl text-4xl font-bold sm:text-5xl">
              Learn skills.
              <br />
              Exchange knowledge.
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-indigo-100">
              Discover expert guidance, book learning sessions, and
              develop your skills through peer learning.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3">
                <ShoppingBag size={20} />
                <span>{services.length} Services</span>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3">
                <User size={20} />
                <span>{new Set(services.map((s) => s.provider)).size} Providers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="grid gap-4 md:grid-cols-[1fr_220px_180px]">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search services, skills, providers..."
                  className="w-full rounded-xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-indigo-500"
                />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>

              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              >
                <option value="all">Any Price</option>
                <option value="30">Up to 30 credits</option>
                <option value="50">Up to 50 credits</option>
                <option value="75">Up to 75 credits</option>
              </select>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <Filter size={16} />
              Showing {filteredServices.length} services
            </div>
          </div>

          {/* Service Cards */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Card Banner */}
                <div
                  className={`flex h-36 items-center justify-center bg-gradient-to-br ${service.color}`}
                >
                  <ShoppingBag size={48} className="text-white/80" />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {service.category}
                    </span>

                    <div className="flex items-center gap-1 text-sm font-semibold text-amber-600">
                      <Star size={15} fill="currentColor" />
                      {service.rating}
                      <span className="font-normal text-slate-400">
                        ({service.reviews})
                      </span>
                    </div>
                  </div>

                  <h2 className="mt-4 text-lg font-bold text-slate-900">
                    {service.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <User size={16} />
                    {service.provider}
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t pt-4">
                    <div>
                      <div className="flex items-center gap-1 text-xl font-bold text-indigo-700">
                        <Coins size={18} />
                        {service.price}
                      </div>

                      <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                        <Clock size={13} />
                        {service.duration}
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedService(service)}
                      className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <div className="mt-8 rounded-2xl border bg-white p-12 text-center">
              <Search size={40} className="mx-auto text-slate-300" />

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                No services found
              </h3>

              <p className="mt-2 text-slate-500">
                Try changing your search or filters.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All Categories");
                  setMaxPrice("all");
                }}
                className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {selectedService.category}
                </span>

                <h2 className="mt-3 text-2xl font-bold text-slate-900">
                  {selectedService.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Provider: {selectedService.provider}
                </p>
              </div>

              <button
                onClick={() => setSelectedService(null)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-amber-50 p-4">
              <Star size={20} fill="currentColor" className="text-amber-500" />
              <span className="font-semibold text-slate-800">
                {selectedService.rating}
              </span>
              <span className="text-sm text-slate-500">
                ({selectedService.reviews} reviews)
              </span>
            </div>

            <p className="mt-6 leading-7 text-slate-600">
              {selectedService.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {selectedService.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Duration</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {selectedService.duration}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Price</p>
                <p className="mt-1 font-semibold text-indigo-700">
                  {selectedService.price} Credits
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sessionStorage.setItem(
                  "selectedMarketplaceService",
                  JSON.stringify(selectedService)
                );
                window.location.href = "/bookings";
              }}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-semibold text-white hover:bg-indigo-700"
            >
              <CheckCircle size={18} />
              Book This Service
            </button>

            <p className="mt-3 text-center text-xs text-slate-400">
              Demo booking navigation. No credits are deducted.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
