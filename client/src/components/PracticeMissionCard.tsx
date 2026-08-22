import type { PracticeMission } from "../types";

const PracticeMissionCard = ({ mission }: { mission: PracticeMission }) => (
  <div className="bg-gradient-to-br from-brand-500 to-brand-700 text-white rounded-2xl p-5 mt-3 relative overflow-hidden">
    <div className="absolute -top-4 -right-4 text-6xl opacity-20">🎯</div>
    <p className="text-xs uppercase tracking-wide font-semibold text-brand-100 mb-1 relative z-10">
      Today's Practice Mission
    </p>
    <p className="font-semibold text-lg mb-2 relative z-10">"{mission.topic}"</p>
    <div className="flex items-center gap-2 text-sm text-brand-100 relative z-10">
      <span>⏱️ {mission.durationMinutes} minutes</span>
    </div>
    <p className="text-xs text-brand-100 mt-2 relative z-10">
      Discuss this topic with your practice partner and try to use new vocabulary during
      the conversation.
    </p>
  </div>
);

export default PracticeMissionCard;