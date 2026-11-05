
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Star,
  Users,
  Clock,
  ArrowLeft,
  Send,
  CheckCircle,
  UserCircle,
} from "lucide-react";

const mentor = {
  name: "Arun Kumar",
  role: "Frontend Developer",
  bio: "Passionate frontend developer helping students learn modern web development through practical projects.",
  skills: ["React", "JavaScript", "Tailwind CSS"],
  wants: ["UI/UX Design", "Python"],
  credits: 50,
  rating: 4.9,
  exchanges: 24,
  experience: "2 years",
};

export default function SkillProfile() {
  const { id } = useParams();

  const [skill, setSkill] = useState("React");
  const [message, setMessage] = useState("");
  const [duration, setDuration] = useState("1 hour");
  const [submitted, setSubmitted] = useState(false);

  const handleRequest = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        <section className="bg-slate-950 px-6 py-12 text-white">
          <div className="mx-auto max-w-7xl">
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Marketplace
            </Link>

            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-500/20 text-indigo-300">
                <UserCircle size={60} />
              </div>

              <div>
                <h1 className="text-3xl font-bold md:text-4xl">
                  {mentor.name}
                </h1>

                <p className="mt-2 text-slate-300">{mentor.role}</p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star size={16} fill="currentColor" />
                    {mentor.rating}
                  </span>

                  <span className="flex items-center gap-1 text-slate-300">
                    <Users size={16} />
                    {mentor.exchanges} exchanges
                  </span>

                  <span className="flex items-center gap-1 text-slate-300">
                    <Clock size={16} />
                    {mentor.experience} experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-3">
          {/* Profile */}
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="text-xl font-bold">About Mentor</h2>
              <p className="mt-4 leading-7 text-slate-600">{mentor.bio}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <h2 className="text-xl font-bold">Skills Offered</h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {mentor.skills.map((item) => (
                  <span
                    key={item}
                    className="rounded-xl bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <h2 className="mt-8 text-xl font-bold">Skills Wanted</h2>

              <div className="mt-5 flex flex-wrap gap-3">
                {mentor.wants.map((item) => (
                  <span
                    key={item}
                    className="rounded-xl bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Exchange Request */}
          <aside>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold">Request Skill Exchange</h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Connect with {mentor.name} and start learning together.
              </p>

              <div className="mt-5 rounded-xl bg-indigo-50 p-4">
                <p className="text-sm text-indigo-600">Exchange value</p>
                <p className="mt-1 text-2xl font-bold text-indigo-700">
                  {mentor.credits} Skill Credits
                </p>
              </div>

              {submitted ? (
                <div className="mt-6 rounded-xl bg-emerald-50 p-5 text-emerald-700">
                  <CheckCircle size={28} />
                  <p className="mt-3 font-semibold">Request prepared!</p>
                  <p className="mt-2 text-sm">
                    This is a UI demonstration. The request has not been saved
                    or sent to the mentor.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm font-semibold underline"
                  >
                    Create another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRequest} className="mt-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Skill to Learn</label>
                    <select
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"
                    >
                      {mentor.skills.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Session Duration</label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3"
                    >
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Introduce yourself and explain what you want to learn..."
                      rows={4}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
                  >
                    <Send size={17} />
                    Send Exchange Request
                  </button>
                </form>
              )}
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
