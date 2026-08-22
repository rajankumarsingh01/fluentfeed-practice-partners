import { useNavigate } from "react-router-dom";

const FEATURES = [
  { icon: "🎯", title: "Smart Matching", desc: "Weighted scoring finds your most compatible partners" },
  { icon: "🌍", title: "Global Learners", desc: "Practice with people from around the world" },
  { icon: "💬", title: "Guided Practice", desc: "Get a fresh discussion topic every time you connect" },
];

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-100 rounded-full blur-3xl opacity-40 -z-10" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center animate-fade-in-up">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-brand-500/30 animate-pulse-glow">
          FF
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Practice English with the
          <span className="text-brand-500"> right partner</span>
        </h1>
        <p className="text-slate-500 mb-8 max-w-md mx-auto text-base sm:text-lg">
          FluentFeed matches you with compatible learners based on your goals, level, and
          schedule — so every conversation actually helps you improve.
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="bg-brand-500 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-brand-600 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-brand-500/25"
        >
          Create Your Profile →
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 text-left">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              style={{ animationDelay: `${i * 100}ms` }}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-fade-in-up"
            >
              <div className="text-2xl mb-2">{f.icon}</div>
              <h3 className="font-semibold text-slate-800 text-sm mb-1">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;