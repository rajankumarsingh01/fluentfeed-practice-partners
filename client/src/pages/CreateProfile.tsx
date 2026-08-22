import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { createProfile, getProfile, updateProfile } from "../api";
import { useUser } from "../context/UserContext.tsx";
import type { ProfileFormData } from "../types";
import ErrorBanner from "../components/ErrorBanner";
import LoadingSpinner from "../components/LoadingSpinner";

const ENGLISH_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const LEARNING_GOALS = [
  "IELTS",
  "TOEFL",
  "Job Interview",
  "Daily Communication",
  "Business English",
];

const emptyForm: ProfileFormData = {
  name: "",
  englishLevel: "",
  learningGoal: "",
  nativeLanguage: "",
  country: "",
  preferredTime: "",
  bio: "",
};

const CreateProfile = () => {
  const { userId, setUserId } = useUser();
  const navigate = useNavigate();

  const [form, setForm] = useState<ProfileFormData>(emptyForm);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!userId);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!userId) {
      setInitialLoading(false);
      return;
    }
    getProfile(userId)
      .then((res) => {
        if (res.data) {
          const {
            name,
            englishLevel,
            learningGoal,
            nativeLanguage,
            country,
            preferredTime,
            bio,
          } = res.data;
          setForm({
            name,
            englishLevel,
            learningGoal,
            nativeLanguage,
            country,
            preferredTime,
            bio,
          });
        }
      })
      .catch(() => setError("Could not load your existing profile."))
      .finally(() => setInitialLoading(false));
  }, [userId]);

  const handleChange = (field: keyof ProfileFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      if (userId) {
        await updateProfile(userId, form);
      } else {
        const res = await createProfile(form);
        if (res.data) setUserId(res.data._id);
      }
      setSuccess(true);
      setTimeout(() => navigate("/find-partners"), 900);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <LoadingSpinner label="Loading your profile..." />;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          {userId ? "Edit Your Profile" : "Create Your Profile"}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Tell us about yourself so we can find your ideal practice partners.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm"
      >
        {error && <ErrorBanner message={error} />}
        {success && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl px-4 py-3">
            ✅ Profile saved! Redirecting to Find Partners...
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g. Rajan Kumar Singh"
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              English Level
            </label>
            <select
              required
              value={form.englishLevel}
              onChange={(e) => handleChange("englishLevel", e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="">Select level</option>
              {ENGLISH_LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Learning Goal
            </label>
            <select
              required
              value={form.learningGoal}
              onChange={(e) => handleChange("learningGoal", e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            >
              <option value="">Select goal</option>
              {LEARNING_GOALS.map((goal) => (
                <option key={goal} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Native Language
            </label>
            <input
              type="text"
              required
              value={form.nativeLanguage}
              onChange={(e) => handleChange("nativeLanguage", e.target.value)}
              placeholder="e.g. Hindi"
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
            <input
              type="text"
              required
              value={form.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="e.g. India"
              className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Preferred Practice Time
          </label>
          <input
            type="text"
            required
            value={form.preferredTime}
            onChange={(e) => handleChange("preferredTime", e.target.value)}
            placeholder="e.g. Evening (6-9 PM)"
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Bio</label>
          <textarea
            required
            value={form.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            placeholder="Tell potential partners a bit about yourself..."
            rows={3}
            maxLength={300}
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
          />
          <p className="text-xs text-slate-400 text-right mt-1">{form.bio.length}/300</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl font-semibold text-white bg-brand-500 hover:bg-brand-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : userId ? "Update Profile" : "Create Profile"}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;