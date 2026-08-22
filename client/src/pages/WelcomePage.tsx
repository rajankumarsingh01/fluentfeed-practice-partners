import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-2xl">
        FF
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">
        Practice English with the right partner
      </h1>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        FluentFeed matches you with compatible learners based on your goals, level, and
        schedule — so every conversation actually helps you improve.
      </p>
      <button
        onClick={() => navigate("/profile")}
        className="bg-brand-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-brand-600 transition-colors"
      >
        Create Your Profile →
      </button>
    </div>
  );
};

export default WelcomePage;