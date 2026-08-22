import { useEffect, useState } from "react";
import { getConnections, updateConnectionStatus } from "../api";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import type { Connection } from "../types";
import ConnectionCard from "../components/ConnectionCard";
import { SkeletonGrid } from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import ErrorBanner from "../components/ErrorBanner";

const MyConnections = () => {
  const { userId } = useUser();
  const { showToast } = useToast();
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

 const loadConnections = () => {
  if (!userId) return;
  setLoading(true);
  getConnections(userId)
    .then((res) => setConnections(res.data || []))
    .catch(() => setError("Could not load your connections."))
    .finally(() => setLoading(false));
};

useEffect(() => {
  
  loadConnections();
 
}, [userId]);

  const handleAction = async (id: string, status: "accepted" | "rejected", name: string) => {
    setActionLoadingId(id);
    try {
      await updateConnectionStatus(id, status);
      loadConnections();
      showToast(
        status === "accepted" ? `You're now connected with ${name}! 🎉` : `Request from ${name} declined`,
        status === "accepted" ? "success" : "info"
      );
    } catch {
      showToast("Could not update connection status.", "error");
      setError("Could not update connection status.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!userId) return null;

  const pending = connections.filter(
    (c) => c.status === "pending" && c.receiverId._id === userId
  );
  const sent = connections.filter(
    (c) => c.status === "pending" && c.senderId._id === userId
  );
  const accepted = connections.filter((c) => c.status === "accepted");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 animate-fade-in-up">
        <h1 className="text-2xl font-bold text-slate-800">Your Connections</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage incoming requests and view your practice partners.
        </p>
      </div>

      {error && (
        <div className="mb-4">
          <ErrorBanner message={error} />
        </div>
      )}

      {loading ? (
        <SkeletonGrid count={3} />
      ) : connections.length === 0 ? (
        <EmptyState
          icon="📭"
          title="No connections yet"
          message="Head over to Find Partners and connect with someone to get started."
        />
      ) : (
        <div className="space-y-8">
          {pending.length > 0 && (
            <section className="animate-fade-in-up">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Incoming Requests ({pending.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pending.map((c) => (
                  <ConnectionCard
                    key={c._id}
                    connection={c}
                    currentUserId={userId}
                    onAccept={(id) => handleAction(id, "accepted", c.senderId.name)}
                    onReject={(id) => handleAction(id, "rejected", c.senderId.name)}
                    actionLoading={actionLoadingId === c._id}
                  />
                ))}
              </div>
            </section>
          )}

          {accepted.length > 0 && (
            <section className="animate-fade-in-up">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Connected ({accepted.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {accepted.map((c) => (
                  <ConnectionCard key={c._id} connection={c} currentUserId={userId} />
                ))}
              </div>
            </section>
          )}

          {sent.length > 0 && (
            <section className="animate-fade-in-up">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Sent Requests ({sent.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sent.map((c) => (
                  <ConnectionCard key={c._id} connection={c} currentUserId={userId} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default MyConnections;