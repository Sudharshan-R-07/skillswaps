
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Bell, BookOpen, Users, Award, Check,
  Trash2, CheckCheck, Clock
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "course",
    title: "New course recommendation",
    message: "A new React Advanced course is available for you.",
    time: "5 minutes ago",
    unread: true
  },
  {
    id: 2,
    type: "exchange",
    title: "Skill exchange request",
    message: "Arun requested a JavaScript skill exchange session.",
    time: "1 hour ago",
    unread: true
  },
  {
    id: 3,
    type: "achievement",
    title: "Learning milestone achieved",
    message: "Congratulations! You completed your first learning milestone.",
    time: "Yesterday",
    unread: false
  },
  {
    id: 4,
    type: "system",
    title: "Welcome to SkillSwap",
    message: "Start learning, sharing skills, and connecting with learners.",
    time: "2 days ago",
    unread: false
  }
];

const notificationIcons = {
  course: BookOpen,
  exchange: Users,
  achievement: Award,
  system: Bell
};

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all");

  const unreadCount = notifications.filter(n => n.unread).length;

  const visibleNotifications = notifications.filter(n =>
    filter === "all" || n.unread
  );

  const markRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, unread: false }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                  <Bell size={24} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Notifications
                </h1>
              </div>

              <p className="mt-3 text-slate-500">
                Stay updated with your learning activities.
              </p>
            </div>

            <button
              onClick={markAllRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
            >
              <CheckCheck size={18} />
              Mark all as read
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Total Notifications</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">
                {notifications.length}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm text-slate-500">Unread Notifications</p>
              <p className="mt-2 text-3xl font-bold text-indigo-600">
                {unreadCount}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-xl px-5 py-3 text-sm font-semibold ${
                filter === "all"
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("unread")}
              className={`rounded-xl px-5 py-3 text-sm font-semibold ${
                filter === "unread"
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notification list */}
          <div className="mt-6 space-y-4">
            {visibleNotifications.map(notification => {
              const Icon = notificationIcons[notification.type];

              return (
                <article
                  key={notification.id}
                  className={`rounded-2xl border p-5 transition hover:shadow-sm ${
                    notification.unread
                      ? "border-indigo-200 bg-indigo-50/40"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">

                    <div className="rounded-xl bg-white p-3 text-indigo-600 shadow-sm">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-900">
                          {notification.title}
                        </h3>

                        {notification.unread && (
                          <span className="h-2 w-2 rounded-full bg-indigo-600" />
                        )}
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {notification.message}
                      </p>

                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                        <Clock size={14} />
                        {notification.time}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        {notification.unread && (
                          <button
                            onClick={() => markRead(notification.id)}
                            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                          >
                            <Check size={16} />
                            Mark as read
                          </button>
                        )}

                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {visibleNotifications.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
                <Bell size={40} className="mx-auto text-slate-300" />
                <h3 className="mt-4 font-semibold text-slate-800">
                  No notifications
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  You're all caught up!
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
