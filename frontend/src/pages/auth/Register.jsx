
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name,
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md space-y-5 rounded-2xl bg-slate-900 p-8"
      >
        <h1 className="text-3xl font-bold text-white">Create Account</h1>

        {error && <p className="text-red-400">{error}</p>}

        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full rounded-lg bg-slate-800 p-3 text-white"
        />

        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-lg bg-slate-800 p-3 text-white"
        />

        <input
          required
          minLength={6}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (minimum 6 characters)"
          className="w-full rounded-lg bg-slate-800 p-3 text-white"
        />

        <button
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 p-3 text-white disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-slate-400">
          Already registered? <Link to="/login" className="text-blue-400">Login</Link>
        </p>
      </form>
    </div>
  );
}
