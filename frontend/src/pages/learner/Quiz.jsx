
import { useState, useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

const questions = [
  {
    question: "What is React primarily used for?",
    options: [
      "Database management",
      "Building user interfaces",
      "Operating systems",
      "Network configuration",
    ],
    answer: 1,
    explanation:
      "React is a JavaScript library used to build interactive user interfaces.",
  },
  {
    question: "Which syntax is commonly used in React to describe UI?",
    options: ["SQL", "XML only", "JSX", "PHP"],
    answer: 2,
    explanation:
      "JSX allows developers to write HTML-like syntax inside JavaScript.",
  },
  {
    question: "Which hook manages component state?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    answer: 1,
    explanation:
      "useState allows functional components to maintain and update state.",
  },
  {
    question: "What is used to pass data from parent to child?",
    options: ["Props", "State only", "Database", "Router"],
    answer: 0,
    explanation:
      "Props are used to pass data from a parent component to a child component.",
  },
  {
    question: "Which hook handles side effects?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    answer: 1,
    explanation:
      "useEffect handles side effects such as subscriptions and data fetching.",
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [review, setReview] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const score = questions.reduce(
    (total, question, index) =>
      total + (answers[index] === question.answer ? 1 : 0),
    0
  );

  const percentage = Math.round(
    (score / questions.length) * 100
  );

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remaining
    ).padStart(2, "0")}`;
  };

  const selectAnswer = (optionIndex) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [current]: optionIndex,
    }));
  };

  const resetQuiz = () => {
    setCurrent(0);
    setAnswers({});
    setSubmitted(false);
    setReview(false);
    setTimeLeft(300);
  };

  const question = questions[current];

  if (submitted && !review) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-slate-50 px-4 py-12">
          <div className="mx-auto max-w-xl rounded-3xl border bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Trophy size={40} />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Quiz Completed!
            </h1>

            <p className="mt-2 text-slate-500">
              React JS Assessment
            </p>

            <div className="my-8 rounded-2xl bg-slate-50 p-6">
              <p className="text-sm text-slate-500">Your Score</p>

              <h2 className="mt-2 text-5xl font-bold text-indigo-600">
                {percentage}%
              </h2>

              <p className="mt-3 font-semibold text-slate-700">
                {score} / {questions.length} correct answers
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {percentage >= 80
                  ? "Excellent performance!"
                  : percentage >= 50
                  ? "Good effort! Keep practicing."
                  : "Keep learning and try again."}
              </p>
            </div>

            <button
              onClick={() => setReview(true)}
              className="mb-3 w-full rounded-xl border py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Review Answers
            </button>

            <button
              onClick={resetQuiz}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              <RotateCcw size={18} />
              Retry Quiz
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-indigo-600">
                React JS Complete Course
              </p>
              <h1 className="mt-2 text-2xl font-bold text-slate-900">
                React Fundamentals Quiz
              </h1>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm">
              <Clock
                size={18}
                className={timeLeft < 60 ? "text-red-500" : "text-indigo-600"}
              />
              <span className={timeLeft < 60 ? "text-red-500" : ""}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6 rounded-2xl border bg-white p-5">
            <div className="mb-3 flex justify-between text-sm text-slate-500">
              <span>Question {current + 1} of {questions.length}</span>
              <span>{Object.keys(answers).length} answered</span>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-indigo-600 transition-all"
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question */}
          <section className="rounded-2xl border bg-white p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                Question {current + 1}
              </span>

              <span className="text-sm text-slate-500">
                1 Mark
              </span>
            </div>

            <h2 className="text-xl font-bold leading-8 text-slate-900">
              {question.question}
            </h2>

            <div className="mt-6 space-y-3">
              {question.options.map((option, index) => {
                const selected = answers[current] === index;

                let style =
                  "border-slate-200 hover:border-indigo-400 hover:bg-indigo-50";

                if (review && index === question.answer) {
                  style = "border-emerald-500 bg-emerald-50";
                } else if (review && selected) {
                  style = "border-red-500 bg-red-50";
                } else if (selected) {
                  style = "border-indigo-600 bg-indigo-50";
                }

                return (
                  <button
                    key={index}
                    disabled={submitted}
                    onClick={() => selectAnswer(index)}
                    className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition ${style}`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
                      {String.fromCharCode(65 + index)}
                    </span>

                    <span className="flex-1 text-sm font-medium text-slate-700">
                      {option}
                    </span>

                    {review && index === question.answer && (
                      <CheckCircle className="text-emerald-600" size={20} />
                    )}

                    {review && selected && index !== question.answer && (
                      <XCircle className="text-red-500" size={20} />
                    )}
                  </button>
                );
              })}
            </div>

            {review && (
              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">
                  Explanation
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {question.explanation}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex flex-wrap justify-between gap-3">
              <button
                onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
                disabled={current === 0}
                className="flex items-center gap-2 rounded-xl border px-4 py-3 font-medium disabled:opacity-40"
              >
                <ArrowLeft size={18} />
                Previous
              </button>

              {!review ? (
                current < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrent((prev) => prev + 1)}
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
                  >
                    Next Question
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (
                        window.confirm("Submit your quiz?")
                      ) {
                        setSubmitted(true);
                      }
                    }}
                    className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white"
                  >
                    Submit Quiz
                  </button>
                ) 
              ) : current < questions.length - 1 ? (
                <button
                  onClick={() => setCurrent((prev) => prev + 1)}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
                >
                  Next Answer
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  onClick={() => setReview(false)}
                  className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
                >
                  Back to Results
                </button>
              )}
            </div>
          </section>

          {/* Question Navigator */}
          <div className="mt-6 rounded-2xl border bg-white p-5">
            <h3 className="mb-4 font-semibold text-slate-900">
              Question Navigator
            </h3>

            <div className="flex flex-wrap gap-3">
              {questions.map((item, index) => (
                <button
                  key={item.question}
                  onClick={() => setCurrent(index)}
                  className={`h-10 w-10 rounded-lg text-sm font-semibold ${
                    current === index
                      ? "bg-indigo-600 text-white"
                      : answers[index] !== undefined
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
