import type { Match, User } from "../types";

interface MatchCardProps {
  match: { user: User; matchPercentage: number };
  onConnect: (userId: string) => void;
  connecting?: boolean;
  alreadyRequested?: boolean;
}

const scoreColor = (score: number) => {
  if (score >= 70) return "text-emerald-600 bg-emerald-50";
  if (score >= 40) return "text-amber-600 bg-amber-50";
  return "text-slate-500 bg-slate-100";
};

const MatchCard = ({ match, onConnect, connecting, alreadyRequested }: MatchCardProps) => {
  const { user, matchPercentage } = match;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{user.name}</h3>
            <p className="text-xs text-slate-500">
              {user.englishLevel} · {user.learningGoal}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${scoreColor(matchPercentage)}`}
        >
          {matchPercentage}% Match
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-3 text-xs text-slate-500">
        <span className="bg-slate-100 px-2 py-1 rounded-full">📍 {user.country}</span>
        <span className="bg-slate-100 px-2 py-1 rounded-full">🗣️ {user.nativeLanguage}</span>
        <span className="bg-slate-100 px-2 py-1 rounded-full">🕒 {user.preferredTime}</span>
      </div>

      {user.bio && <p className="text-sm text-slate-600 mb-4 line-clamp-2">{user.bio}</p>}

      <button
        onClick={() => onConnect(user._id)}
        disabled={connecting || alreadyRequested}
        className="w-full py-2 rounded-xl text-sm font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {alreadyRequested ? "Request Sent" : connecting ? "Connecting..." : "Connect"}
      </button>
    </div>
  );
};

export default MatchCard;