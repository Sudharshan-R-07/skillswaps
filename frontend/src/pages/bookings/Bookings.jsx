
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  CalendarDays,
  Clock,
  User,
  Video,
  MapPin,
  CheckCircle,
  XCircle,
  Plus
} from "lucide-react";

const initialBookings = [
  {
    id: 1,
    person: "Arun Kumar",
    skill: "React Development",
    date: "2026-11-08",
    time: "10:00",
    duration: "60",
    mode: "Online",
    status: "Confirmed"
  },
  {
    id: 2,
    person: "Priya Sharma",
    skill: "UI/UX Design",
    date: "2026-11-10",
    time: "15:00",
    duration: "45",
    mode: "Online",
    status: "Pending"
  }
];

const resourcePersons = [
  { name: "Arun Kumar", skills: ["React Development", "JavaScript"] },
  { name: "Priya Sharma", skills: ["UI/UX Design", "Figma"] },
  { name: "Rahul", skills: ["Python Programming", "Data Science"] }
];

export default function Bookings() {
  const [bookings, setBookings] = useState(initialBookings);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    person: "Arun Kumar",
    skill: "React Development",
    date: "",
    time: "",
    duration: "60",
    mode: "Online",
    notes: ""
  });

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const selectedPerson = resourcePersons.find(
    person => person.name === form.person
  );

  const submitBooking = (e) => {
    e.preventDefault();

    const newBooking = {
      id: Date.now(),
      person: form.person,
      skill: form.skill,
      date: form.date,
      time: form.time,
      duration: form.duration,
      mode: form.mode,
      status: "Pending"
    };

    setBookings(prev => [...prev, newBooking]);
    setShowForm(false);
    setSubmitted(true);

    setForm({
      person: "Arun Kumar",
      skill: "React Development",
      date: "",
      time: "",
      duration: "60",
      mode: "Online",
      notes: ""
    });
  };

  const cancelBooking = (id) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === id
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
  };

  const upcomingBookings = bookings.filter(
    booking => booking.status !== "Cancelled"
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-indigo-600">
                SKILL EXCHANGE
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                My Bookings
              </h1>
              <p className="mt-2 text-slate-500">
                Schedule and manage your learning sessions.
              </p>
            </div>

            <button
              onClick={() => {
                setShowForm(!showForm);
                setSubmitted(false);
              }}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              <Plus size={18} />
              Book a Session
            </button>
          </div>

          {/* Confirmation */}
          {submitted && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
              <CheckCircle size={20} />
              Demo booking created successfully. Status: Pending.
            </div>
          )}

          {/* Booking Form */}
          {showForm && (
            <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Schedule a Skill Exchange
              </h2>

              <form onSubmit={submitBooking} className="mt-6 space-y-5">

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Resource Person
                    </label>
                    <select
                      value={form.person}
                      onChange={e => {
                        const person = resourcePersons.find(
                          p => p.name === e.target.value
                        );
                        updateForm("person", e.target.value);
                        updateForm("skill", person.skills[0]);
                      }}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      {resourcePersons.map(person => (
                        <option key={person.name}>{person.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Skill
                    </label>
                    <select
                      value={form.skill}
                      onChange={e => updateForm("skill", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      {selectedPerson?.skills.map(skill => (
                        <option key={skill}>{skill}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Session Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split("T")[0]}
                      value={form.date}
                      onChange={e => updateForm("date", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Session Time
                    </label>
                    <input
                      type="time"
                      required
                      value={form.time}
                      onChange={e => updateForm("time", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Duration
                    </label>
                    <select
                      value={form.duration}
                      onChange={e => updateForm("duration", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                      <option value="90">90 minutes</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Session Mode
                    </label>
                    <select
                      value={form.mode}
                      onChange={e => updateForm("mode", e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <option>Online</option>
                      <option>Offline</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Learning Goals
                  </label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={e => updateForm("notes", e.target.value)}
                    placeholder="What do you want to learn during this session?"
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                  >
                    Confirm Booking
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="rounded-xl border border-slate-200 px-6 py-3 font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Booking Cards */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900">
              Upcoming Sessions
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {upcomingBookings.map(booking => (
                <article
                  key={booking.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                        <CalendarDays size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {booking.skill}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          With {booking.person}
                        </p>
                      </div>
                    </div>

                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                      booking.status === "Confirmed"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={17} />
                      {booking.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={17} />
                      {booking.time} · {booking.duration} minutes
                    </div>

                    <div className="flex items-center gap-2">
                      {booking.mode === "Online"
                        ? <Video size={17} />
                        : <MapPin size={17} />}
                      {booking.mode}
                    </div>
                  </div>

                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="mt-6 flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    <XCircle size={16} />
                    Cancel Session
                  </button>
                </article>
              ))}
            </div>

            {upcomingBookings.length === 0 && (
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white py-16 text-center">
                <CalendarDays size={40} className="mx-auto text-slate-300" />
                <p className="mt-4 font-medium text-slate-700">
                  No upcoming sessions
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Book a session to start learning.
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
