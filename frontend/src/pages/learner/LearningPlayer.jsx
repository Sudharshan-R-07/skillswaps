
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Play,
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Introduction to React",
    duration: "12:30",
    section: "Getting Started",
  },
  {
    id: 2,
    title: "Understanding Components",
    duration: "18:45",
    section: "Getting Started",
  },
  {
    id: 3,
    title: "JSX Fundamentals",
    duration: "15:20",
    section: "Getting Started",
  },
  {
    id: 4,
    title: "Props and State",
    duration: "24:10",
    section: "React Fundamentals",
  },
  {
    id: 5,
    title: "Event Handling",
    duration: "16:40",
    section: "React Fundamentals",
  },
  {
    id: 6,
    title: "React Hooks",
    duration: "30:00",
    section: "React Fundamentals",
  },
];

export default function LearningPlayer() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completed, setCompleted] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const lesson = lessons[currentLesson];
  const progress = Math.round(
    (completed.length / lessons.length) * 100
  );

  const markComplete = () => {
    setCompleted((prev) =>
      prev.includes(lesson.id) ? prev : [...prev, lesson.id]
    );
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const previousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Course Header */}
        <div className="border-b bg-white px-4 py-5 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-medium text-indigo-600">
              My Learning / React JS Complete Course
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-slate-900">
                {lesson.title}
              </h1>

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 rounded-lg border px-4 py-2 lg:hidden"
              >
                {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
                Lessons
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 p-4 lg:grid-cols-[1fr_350px] lg:p-8">
          {/* Main Player */}
          <section>
            {/* Video Placeholder */}
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-slate-950">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black" />

              <div className="relative text-center text-white">
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600">
                  <Play size={34} fill="white" />
                </div>

                <h2 className="text-xl font-bold">
                  {lesson.title}
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Demo Video Player
                </p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm text-white">
                <span>{lesson.duration}</span>
                <span>Demo Mode</span>
              </div>
            </div>

            {/* Lesson Information */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Lesson {currentLesson + 1} of {lessons.length}
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    {lesson.title}
                  </h2>
                </div>

                <button
                  onClick={markComplete}
                  disabled={completed.includes(lesson.id)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 font-semibold ${
                    completed.includes(lesson.id)
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-indigo-600 text-white hover:bg-indigo-700"
                  }`}
                >
                  <CheckCircle size={18} />
                  {completed.includes(lesson.id)
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>

              <div className="my-6 border-t border-slate-100" />

              <p className="leading-7 text-slate-600">
                Welcome to this React learning lesson. Follow the course
                curriculum, understand the concepts, and complete every
                lesson to improve your learning progress.
              </p>

              {/* Navigation */}
              <div className="mt-8 flex justify-between gap-4">
                <button
                  onClick={previousLesson}
                  disabled={currentLesson === 0}
                  className="flex items-center gap-2 rounded-xl border px-4 py-3 font-medium text-slate-700 disabled:opacity-40"
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <button
                  onClick={nextLesson}
                  disabled={currentLesson === lessons.length - 1}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white disabled:opacity-40"
                >
                  Next Lesson
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </section>

          {/* Curriculum Sidebar */}
          <aside
            className={`${
              sidebarOpen ? "block" : "hidden"
            } lg:block`}
          >
            <div className="rounded-2xl border border-slate-200 bg-white">
              <div className="border-b p-5">
                <h2 className="text-lg font-bold text-slate-900">
                  Course Content
                </h2>

                <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                  <span>{completed.length}/{lessons.length} completed</span>
                  <span>{progress}%</span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="max-h-[600px] overflow-y-auto p-3">
                {["Getting Started", "React Fundamentals"].map(
                  (section) => (
                    <div key={section} className="mb-5">
                      <h3 className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                        {section}
                      </h3>

                      {lessons
                        .filter((item) => item.section === section)
                        .map((item) => {
                          const index = lessons.findIndex(
                            (l) => l.id === item.id
                          );

                          const isCompleted = completed.includes(item.id);
                          const isActive = currentLesson === index;

                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setCurrentLesson(index);
                                setSidebarOpen(false);
                              }}
                              className={`mb-1 flex w-full items-start gap-3 rounded-xl p-3 text-left ${
                                isActive
                                  ? "bg-indigo-50 text-indigo-700"
                                  : "hover:bg-slate-50"
                              }`}
                            >
                              <div className="mt-1">
                                {isCompleted ? (
                                  <CheckCircle
                                    size={18}
                                    className="text-emerald-600"
                                  />
                                ) : isActive ? (
                                  <Play size={18} />
                                ) : (
                                  <Circle size={18} />
                                )}
                              </div>

                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  {item.title}
                                </p>

                                <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                                  <Clock size={12} />
                                  {item.duration}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  )
                )}
              </div>

              <div className="border-t p-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <BookOpen size={18} />
                  {lessons.length} lessons
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}
