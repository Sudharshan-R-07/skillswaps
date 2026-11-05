
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">

        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <BookOpen className="text-indigo-400" size={28} />
            <span className="text-xl font-bold">
              SkillSwap
            </span>
          </div>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
            Learn new skills, share your knowledge, and grow together.
            Your next learning journey starts here.
          </p>

          <p className="mt-5 text-sm text-slate-500">
            Learn. Teach. Grow.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-semibold">Explore</h3>

          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link className="block hover:text-white" to="/courses">
              Courses
            </Link>

            <Link className="block hover:text-white" to="/skills">
              Skill Exchange
            </Link>

            <Link className="block hover:text-white" to="/register">
              Become a Learner
            </Link>
          </div>
        </div>

        {/* Platform */}
        <div>
          <h3 className="font-semibold">Platform</h3>

          <div className="mt-4 space-y-3 text-sm text-slate-400">
            <Link className="block hover:text-white" to="/about">
              About Us
            </Link>

            <Link className="block hover:text-white" to="/login">
              Login
            </Link>

            <Link className="block hover:text-white" to="/register">
              Join SkillSwap
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800 px-6 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </div>
    </footer>
  );
}
