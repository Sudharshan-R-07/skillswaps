
import { useState } from "react";
import api from "../api/api";

export default function ProtectedTest() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const testAPI = async () => {
    try {
      setError("");

      const response = await api.get("/protected");

      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-4 text-2xl font-bold">
        Firebase Authentication Test
      </h1>

      <button
        onClick={testAPI}
        className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
      >
        Test Protected API
      </button>

      {result && (
        <pre className="mt-5 rounded-lg bg-green-50 p-4">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}
    </div>
  );
}
