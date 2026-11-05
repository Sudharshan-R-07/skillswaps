
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useAuth } from "../../context/AuthContext";
import api from "../../api/api";

import {
  Star,
  Clock,
  Users,
  BookOpen,
  CheckCircle,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Award,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user, profile, loading: authLoading } = useAuth();

  const [course, setCourse] = useState(null);
  const [expanded, setExpanded] = useState(0);

  const [loadingCourse, setLoadingCourse] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load course details from backend
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoadingCourse(true);
        setError("");

        const response = await api.get(`/courses/${id}`);

        setCourse(response.data.course);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load course details."
        );
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Check enrollment status
  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user || authLoading || !course) {
        setEnrolled(false);
        return;
      }

      try {
        const response = await api.get(`/enrollments/${id}/status`);

        setEnrolled(response.data.enrolled);
      } catch (err) {
        console.error(
          "Enrollment status check failed:",
          err.response?.data || err.message
        );
      }
    };

    checkEnrollment();
  }, [user, authLoading, course, id]);

  // Enroll user
  const handleEnroll = async () => {
    if (authLoading) return;

    if (!user) {
      navigate("/login", {
        state: {
          from: `/courses/${id}`,
        },
      });

      return;
    }

    if (enrolled) {
      navigate(`/learn/${id}`);
      return;
    }

    try {
      setEnrolling(true);
      setError("");
      setSuccess("");

      await api.post("/enrollments", {
        courseId: id,
      });

      setEnrolled(true);
      setSuccess("Successfully enrolled in this course!");

      setTimeout(() => {
        navigate(`/learn/${id}`);
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Enrollment failed. Please try again."
      );
    } finally {
      setEnrolling(false);
    }
  };

  // Loading
  if (loadingCourse) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <div className="text-center">
            <Loader2
              className="mx-auto animate-spin text-indigo-600"
              size={40}
            />
            <p className="mt-4 text-slate-600">
              Loading course details...
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  // Error
  if (!course) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
          <div className="max-w-md text-center">
            <AlertCircle
              className="mx-auto text-red-500"
              size={48}
            />

            <h2 className="mt-4 text-2xl font-bold">
              Course unavailable
            </h2>

            <p className="mt-3 text-slate-600">
              {error || "Course not found."}
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-white"
            >
              Back to Courses
            </Link>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  const curriculum = course.curriculum || [];
  const outcomes = course.outcomes || [];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">

        {/* HERO */}
        <section className="bg-slate-950 px-6 py-14 text-white">
          <div className="mx-auto max-w-7xl">

            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Courses
            </Link>

            <div className="mt-8 max-w-3xl">

              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm text-indigo-300">
                {course.category || "Development"}
              </span>

              <h1 className="mt-5 text-3xl font-bold md:text-5xl">
                {course.title}
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-5 text-sm text-slate-300">

                <span className="flex items-center gap-2 text-amber-400">
                  <Star size={17} fill="currentColor" />
                  {course.rating || "New"}
                </span>

                <span className="flex items-center gap-2">
                  <Users size={17} />
                  {(course.students || 0).toLocaleString()} students
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={17} />
                  {course.duration || "Self-paced"}
                </span>

                <span className="flex items-center gap-2">
                  <BookOpen size={17} />
                  {course.level || "Beginner"}
                </span>
              </div>

              <p className="mt-6 text-sm text-slate-400">
                Instructor:{" "}
                <strong className="text-white">
                  {course.instructor?.name ||
                    course.instructorName ||
                    "SkillSwap Instructor"}
                </strong>
              </p>

            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mx-auto max-w-7xl px-6 py-12">

          <div className="grid gap-10 lg:grid-cols-3">

            {/* MAIN */}
            <div className="space-y-10 lg:col-span-2">

              {/* LEARNING OUTCOMES */}
              <div className="rounded-2xl border border-slate-200 bg-white p-7">

                <h2 className="text-2xl font-bold text-slate-900">
                  What you'll learn
                </h2>

                {outcomes.length > 0 ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {outcomes.map((outcome, index) => (
                      <div
                        key={index}
                        className="flex gap-3 text-sm text-slate-600"
                      >
                        <CheckCircle
                          className="shrink-0 text-emerald-500"
                          size={18}
                        />
                        {outcome}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-slate-500">
                    Course learning outcomes will be updated soon.
                  </p>
                )}

              </div>

              {/* CURRICULUM */}
              <div className="rounded-2xl border border-slate-200 bg-white p-7">

                <h2 className="text-2xl font-bold text-slate-900">
                  Course Curriculum
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {curriculum.length} modules ·{" "}
                  {curriculum.reduce(
                    (total, module) =>
                      total + (module.lessons?.length || 0),
                    0
                  )}{" "}
                  lessons
                </p>

                <div className="mt-6 space-y-3">

                  {curriculum.map((module, index) => (
                    <div
                      key={module._id || module.title || index}
                      className="overflow-hidden rounded-xl border border-slate-200"
                    >

                      <button
                        onClick={() =>
                          setExpanded(
                            expanded === index ? -1 : index
                          )
                        }
                        className="flex w-full items-center justify-between bg-slate-50 px-5 py-4 text-left font-semibold text-slate-800 hover:bg-slate-100"
                      >
                        {module.title}

                        {expanded === index ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </button>

                      {expanded === index && (
                        <div className="space-y-3 px-5 py-4">

                          {(module.lessons || []).map(
                            (lesson, lessonIndex) => (
                              <div
                                key={lesson._id || lessonIndex}
                                className="flex items-center gap-3 text-sm text-slate-600"
                              >
                                <PlayCircle
                                  size={17}
                                  className="text-indigo-500"
                                />

                                {typeof lesson === "string"
                                  ? lesson
                                  : lesson.title}
                              </div>
                            )
                          )}

                          {(!module.lessons ||
                            module.lessons.length === 0) && (
                            <p className="text-sm text-slate-500">
                              Lessons coming soon.
                            </p>
                          )}

                        </div>
                      )}

                    </div>
                  ))}

                  {curriculum.length === 0 && (
                    <p className="rounded-lg bg-slate-50 p-5 text-sm text-slate-500">
                      Course curriculum will be added soon.
                    </p>
                  )}

                </div>
              </div>

            </div>

            {/* ENROLLMENT CARD */}
            <aside>
              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
                  <PlayCircle size={64} strokeWidth={1.5} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  Start learning today
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Join this course and develop your skills.
                </p>

                {/* ERROR */}
                {error && (
                  <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {/* SUCCESS */}
                {success && (
                  <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-600">
                    {success}
                  </div>
                )}

                {/* ENROLL BUTTON */}
                <button
                  onClick={handleEnroll}
                  disabled={authLoading || enrolling}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {authLoading || enrolling ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {enrolling
                        ? "Enrolling..."
                        : "Checking Login..."}
                    </>
                  ) : enrolled ? (
                    "Continue Learning"
                  ) : user ? (
                    "Enroll Now"
                  ) : (
                    "Login to Enroll"
                  )}

                </button>

                <div className="mt-6 space-y-4 border-t border-slate-200 pt-5 text-sm text-slate-600">

                  <div className="flex items-center gap-3">
                    <Clock size={18} />
                    {course.duration || "Self-paced"} of learning
                  </div>

                  <div className="flex items-center gap-3">
                    <BookOpen size={18} />
                    {course.level || "Beginner"} level
                  </div>

                  <div className="flex items-center gap-3">
                    <Award size={18} />
                    Certificate included
                  </div>

                  <div className="flex items-center gap-3">
                    <Users size={18} />
                    {(course.students || 0).toLocaleString()} learners
                  </div>

                </div>

              </div>
            </aside>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
