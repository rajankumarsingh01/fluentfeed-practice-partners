import { useEffect, useState } from "react";
import { getMatches, getUsers, sendConnectionRequest, type UserFilters } from "../api";
import { useUser } from "../context/UserContext.tsx";
import type { Match, User } from "../types";
import MatchCard from "../components/MatchCard";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";

const ENGLISH_LEVELS = ["Beginner", "Intermediate", "Advanced"];
const LEARNING_GOALS = [
  "IELTS",
  "TOEFL",
  "Job Interview",
  "Daily Communication",
  "Business English",
];

const FindPartners = () => {
  const { userId } = useUser();

  const [topMatches, setTopMatches] = useState<Match[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[] | null>(null);
  const [filters, setFilters] = useState<UserFilters>({});
  const [loading, setLoading] = useState(true);
  const [filtering, setFiltering] = useState(false);
  const [error, setError] = useState("");
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [requestedIds, setRequestedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getMatches(userId)
      .then((res) => setTopMatches(res.data || []))
      .catch(() => setError("Could not load your matches. Please try again."))
      .finally(() => setLoading(false));
  }, [userId]);

  const applyFilters = async () => {
    if (!userId) return;
    const hasActiveFilters = filters.englishLevel || filters.learningGoal || filters.country;
    if (!hasActiveFilters) {
      setFilteredUsers(null);
      return;
    }

    setFiltering(true);
    setError("");
    try {
      const res = await getUsers({ ...filters, userId });
      setFilteredUsers(res.data || []);
    } catch {
      setError("Could not apply filters. Please try again.");
    } finally {
      setFiltering(false);
    }
  };

  const handleConnect = async (targetUserId: string) => {
    if (!userId) return;
    setConnectingId(targetUserId);
    try {
      await sendConnectionRequest(userId, targetUserId);
      setRequestedIds((prev) => new Set(prev).add(targetUserId));
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not send connection request.");
    } finally {
      setConnectingId(null);
    }
  };

  const displayList =
    filteredUsers !== null
      ? filteredUsers.map((u) => ({ user: u, matchScore: 0, matchPercentage: 0 }))
      : topMatches;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Find Practice Partners</h1>
        <p className="text-sm text-slate-500 mt-1">
          Your top 5 compatible partners, ranked by match score.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <select
            value={filters.englishLevel || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, englishLevel: e.target.value || undefined }))
            }
            className="border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="">All Levels</option>
            {ENGLISH_LEVELS.map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>

          <select
            value={filters.learningGoal || ""}
            onChange={(e) =>
              setFilters((f) => ({ ...f, learningGoal: e.target.value || undefined }))
            }
            className="border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          >
            <option value="">All Goals</option>
            {LEARNING_GOALS.map((goal) => (
              <option key={goal} value={goal}>
                {goal}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Country"
            value={filters.country || ""}
            onChange={(e) => setFilters((f) => ({ ...f, country: e.target.value || undefined }))}
            className="border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />

          <button
            onClick={applyFilters}
            disabled={filtering}
            className="bg-slate-800 text-white rounded-xl px-4 py-2 text-sm font-medium hover:bg-slate-900 disabled:opacity-50"
          >
            {filtering ? "Searching..." : "Apply Filters"}
          </button>
        </div>
        {filteredUsers !== null && (
          <button
            onClick={() => {
              setFilters({});
              setFilteredUsers(null);
            }}
            className="text-xs text-brand-600 mt-2 hover:underline"
          >
            ← Back to top matches
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4">
          <ErrorBanner message={error} />
        </div>
      )}

      {loading ? (
        <LoadingSpinner label="Finding your best matches..." />
      ) : displayList.length === 0 ? (
        <EmptyState
          icon="🤝"
          title="No partners found"
          message="Try adjusting your filters, or check back later as more learners join."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayList.map((m) => (
            <MatchCard
              key={m.user._id}
              match={m}
              onConnect={handleConnect}
              connecting={connectingId === m.user._id}
              alreadyRequested={requestedIds.has(m.user._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FindPartners;