
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getMyProfile,
  updateMyProfile,
} from "../../api/userService";

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();

  const [form, setForm] = useState({
    displayName: "",
    bio: "",
    location: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getMyProfile();

        setForm({
          displayName: data.displayName || "",
          bio: data.bio || "",
          location: data.location || "",
          skills: (data.skills || []).join(", "),
        });
      } catch (error) {
        setMessage(
          error.response?.data?.message ||
          "Unable to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      await updateMyProfile({
        displayName: form.displayName,
        bio: form.bio,
        location: form.location,
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      });

      await refreshProfile();

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Profile update failed"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading profile...</div>;
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your SkillSwap profile.
        </p>
      </div>

      <div className="mb-6 rounded-xl border p-5">
        <p className="text-sm text-gray-500">
          Firebase Account
        </p>

        <p className="mt-1 font-medium">
          {user?.email}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Role: {profile?.role || "LEARNER"}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-xl border p-6"
      >
        <div>
          <label className="mb-2 block font-medium">
            Display Name
          </label>

          <input
            name="displayName"
            value={form.displayName}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Bio
          </label>

          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows="4"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Location
          </label>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Skills
          </label>

          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="React, Java, Python"
            className="w-full rounded-lg border p-3"
          />

          <p className="mt-1 text-sm text-gray-500">
            Separate skills using commas.
          </p>
        </div>

        {message && (
          <p className="text-sm text-blue-600">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-3 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
