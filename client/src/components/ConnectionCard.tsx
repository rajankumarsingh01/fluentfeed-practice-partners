import type { Connection } from "../types";
import PracticeMissionCard from "./PracticeMissionCard";

interface ConnectionCardProps {
  connection: Connection;
  currentUserId: string;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  actionLoading?: boolean;
}

const statusBadge: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  accepted: "bg-emerald-50 text-emerald-600",
  rejected: "bg-red-50 text-red-500",
};

const ConnectionCard = ({
  connection,
  currentUserId,
  onAccept,
  onReject,
  actionLoading,
}: ConnectionCardProps) => {
  const isIncoming = connection.receiverId._id === currentUserId;
  const otherUser = isIncoming ? connection.senderId : connection.receiverId;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-200 stagger-item">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-semibold text-sm">
            {otherUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">{otherUser.name}</p>
            <p className="text-xs text-slate-500">
              {otherUser.englishLevel} · {otherUser.learningGoal}
            </p>
          </div>
        </div>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusBadge[connection.status]}`}
        >
          {connection.status}
        </span>
      </div>

      {isIncoming && connection.status === "pending" && (
        <p className="text-xs text-slate-500 mb-3">
          {otherUser.name} wants to practice English with you.
        </p>
      )}

      {connection.status === "pending" && isIncoming && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onAccept?.(connection._id)}
            disabled={actionLoading}
            className="flex-1 py-1.5 rounded-lg text-sm font-medium bg-brand-500 text-white hover:bg-brand-600 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            Accept
          </button>
          <button
            onClick={() => onReject?.(connection._id)}
            disabled={actionLoading}
            className="flex-1 py-1.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            Reject
          </button>
        </div>
      )}

      {connection.status === "pending" && !isIncoming && (
        <p className="text-xs text-slate-400 mt-2">
          Waiting for {otherUser.name} to respond...
        </p>
      )}

      {connection.status === "accepted" && connection.practiceMission && (
        <PracticeMissionCard mission={connection.practiceMission} />
      )}
    </div>
  );
};

export default ConnectionCard;