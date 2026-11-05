
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../../firebase/firebase";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // Return to original page or Dashboard
  const redirectTo = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Email Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Return to the original course/page
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      await signInWithPopup(auth, new GoogleAuthProvider());

      // Return to the original course/page
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-5 rounded-2xl bg-slate-900 p-8"
      >
        <h1 className="text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="text-sm text-slate-400">
          Login to continue learning with SkillSwap.
        </p>

        {error && (
          <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </p>
        )}

        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full rounded-lg bg-indigo-600 p-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="text-sm text-slate-500">OR</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || googleLoading}
          className="w-full rounded-lg border border-slate-700 p-3 text-white transition hover:bg-slate-800 disabled:opacity-50"
        >
          {googleLoading ? "Connecting to Google..." : "Continue with Google"}
        </button>

        <p className="text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            state={{ from: redirectTo }}
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
