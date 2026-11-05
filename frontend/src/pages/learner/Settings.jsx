
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  Settings as SettingsIcon,
  Bell,
  Shield,
  Lock,
  Eye,
  Mail,
  Save,
  Trash2,
  CheckCircle
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    skillRequests: true,
    achievementAlerts: false,
    profileVisibility: "public",
    showEmail: false,
    twoFactor: false,
    darkMode: false
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const saveSettings = () => {
    setSaved(true);
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${
        checked ? "bg-indigo-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );

  const SettingRow = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <h3 className="font-medium text-slate-800">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
              <SettingsIcon size={25} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Account Settings
              </h1>
              <p className="mt-1 text-slate-500">
                Customize your SkillSwap experience.
              </p>
            </div>
          </div>

          {/* Notifications */}
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Bell className="text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Notifications
              </h2>
            </div>

            <SettingRow
              title="Email Notifications"
              description="Receive important updates through email."
              checked={settings.emailNotifications}
              onChange={v => updateSetting("emailNotifications", v)}
            />

            <div className="border-t border-slate-100">
              <SettingRow
                title="Course Updates"
                description="Updates about enrolled courses."
                checked={settings.courseUpdates}
                onChange={v => updateSetting("courseUpdates", v)}
              />
            </div>

            <div className="border-t border-slate-100">
              <SettingRow
                title="Skill Exchange Requests"
                description="Get notified about skill exchange requests."
                checked={settings.skillRequests}
                onChange={v => updateSetting("skillRequests", v)}
              />
            </div>

            <div className="border-t border-slate-100">
              <SettingRow
                title="Achievement Alerts"
                description="Receive notifications about learning milestones."
                checked={settings.achievementAlerts}
                onChange={v => updateSetting("achievementAlerts", v)}
              />
            </div>
          </section>

          {/* Privacy */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Shield className="text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Privacy
              </h2>
            </div>

            <div className="py-5">
              <label className="font-medium text-slate-800">
                Profile Visibility
              </label>
              <p className="mt-1 text-sm text-slate-500">
                Choose who can view your profile.
              </p>

              <select
                value={settings.profileVisibility}
                onChange={e =>
                  updateSetting("profileVisibility", e.target.value)
                }
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 sm:max-w-sm"
              >
                <option value="public">Public</option>
                <option value="learners">Registered Learners</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="border-t border-slate-100">
              <SettingRow
                title="Show Email on Profile"
                description="Allow others to see your email address."
                checked={settings.showEmail}
                onChange={v => updateSetting("showEmail", v)}
              />
            </div>
          </section>

          {/* Security */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Lock className="text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Security
              </h2>
            </div>

            <div className="py-5">
              <h3 className="font-medium text-slate-800">
                Authentication Provider
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                SkillSwap uses Firebase Authentication for login security.
              </p>
              <div className="mt-3 inline-flex rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                Firebase Authentication
              </div>
            </div>

            <div className="border-t border-slate-100">
              <SettingRow
                title="Two-Factor Authentication"
                description="Enable additional account verification (UI demo)."
                checked={settings.twoFactor}
                onChange={v => updateSetting("twoFactor", v)}
              />
            </div>
          </section>

          {/* Preferences */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <Eye className="text-indigo-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Preferences
              </h2>
            </div>

            <SettingRow
              title="Dark Mode"
              description="Dark theme preference (visual demo only)."
              checked={settings.darkMode}
              onChange={v => updateSetting("darkMode", v)}
            />
          </section>

          {/* Save */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            {saved && (
              <p className="flex items-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle size={18} />
                Settings saved in this demo.
              </p>
            )}

            <button
              onClick={saveSettings}
              className="ml-auto flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>

          {/* Danger Zone */}
          <section className="mt-8 rounded-2xl border border-red-200 bg-white p-6">
            <h2 className="flex items-center gap-2 font-bold text-red-600">
              <Trash2 size={20} />
              Danger Zone
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Account deletion permanently removes your account and data.
            </p>

            <button
              onClick={() =>
                alert("Account deletion will be implemented securely in the backend.")
              }
              className="mt-4 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Delete Account
            </button>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
