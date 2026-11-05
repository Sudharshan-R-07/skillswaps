
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  GraduationCap,
  Send,
  CheckCircle,
  Clock,
  User,
  Briefcase,
  BookOpen
} from "lucide-react";

export default function ResourcePersonApplication() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    skills: "",
    motivation: "",
    availability: "Weekends",
    sessionType: "Online"
  });

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
              <GraduationCap size={32} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Become a Resource Person
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Share your expertise, teach other learners, and grow your
              professional network through SkillSwap.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Teach Skills", "Share what you know"],
              ["Earn Credits", "Get rewarded for sessions"],
              ["Build Network", "Connect with learners"]
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 bg-white p-5 text-center"
              >
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-500">{description}</p>
              </div>
            ))}
          </div>

          {/* Application form */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            {submitted ? (
              <div className="py-12 text-center">
                <CheckCircle
                  size={56}
                  className="mx-auto text-green-500"
                />

                <h2 className="mt-5 text-2xl font-bold text-slate-900">
                  Application Submitted!
                </h2>

                <p className="mx-auto mt-3 max-w-md text-slate-500">
                  Your demo application has been submitted successfully.
                  The real approval workflow will be connected to the backend.
                </p>

                <div className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700">
                  <Clock size={16} />
                  Pending Review (Demo)
                </div>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      email: "",
                      expertise: "",
                      experience: "",
                      skills: "",
                      motivation: "",
                      availability: "Weekends",
                      sessionType: "Online"
                    });
                  }}
                  className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  Create Another Application
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-slate-900">
                    Application Form
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Tell us about your skills and teaching experience.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Personal details */}
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <User size={18} className="text-indigo-600" />
                    Personal Information
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        Full Name
                      </label>
                      <input
                        required
                        value={form.name}
                        onChange={e => updateForm("name", e.target.value)}
                        placeholder="Enter your name"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={e => updateForm("email", e.target.value)}
                        placeholder="you@example.com"
                        className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Expertise */}
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Briefcase size={18} className="text-indigo-600" />
                    Expertise & Experience
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Primary Expertise
                    </label>
                    <input
                      required
                      value={form.expertise}
                      onChange={e => updateForm("expertise", e.target.value)}
                      placeholder="e.g. Full Stack Development"
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Experience
                    </label>
                    <select
                      required
                      value={form.experience}
                      onChange={e => updateForm("experience", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500"
                    >
                      <option value="">Select experience</option>
                      <option value="Beginner">Beginner</option>
                      <option value="1-2 years">1–2 years</option>
                      <option value="3-5 years">3–5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Skills You Want to Teach
                    </label>
                    <input
                      required
                      value={form.skills}
                      onChange={e => updateForm("skills", e.target.value)}
                      placeholder="React, JavaScript, Python..."
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                    />
                    <p className="mt-2 text-xs text-slate-400">
                      Separate multiple skills using commas.
                    </p>
                  </div>

                  {/* Teaching */}
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <BookOpen size={18} className="text-indigo-600" />
                    Teaching Preferences
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        Availability
                      </label>
                      <select
                        value={form.availability}
                        onChange={e => updateForm("availability", e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                      >
                        <option>Weekdays</option>
                        <option>Weekends</option>
                        <option>Evenings</option>
                        <option>Flexible</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-slate-600">
                        Session Type
                      </label>
                      <select
                        value={form.sessionType}
                        onChange={e => updateForm("sessionType", e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                      >
                        <option>Online</option>
                        <option>Offline</option>
                        <option>Both</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Why do you want to become a Resource Person?
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.motivation}
                      onChange={e => updateForm("motivation", e.target.value)}
                      placeholder="Describe your motivation and how you can help other learners..."
                      className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white hover:bg-indigo-700"
                  >
                    <Send size={18} />
                    Submit Application
                  </button>

                  <p className="text-center text-xs text-slate-400">
                    Application submission is currently a frontend demo.
                  </p>
                </form>
              </>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
