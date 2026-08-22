import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";
const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
    isActive
      ? "bg-brand-500 text-white"
      : "text-slate-600 hover:bg-brand-50 hover:text-brand-600"
  }`;

const Navbar = () => {
  const { userId } = useUser();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm">
            FF
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">
            FluentFeed
          </span>
        </div>

        {userId && (
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink to="/profile" className={linkClasses}>
              Profile
            </NavLink>
            <NavLink to="/find-partners" className={linkClasses}>
              Find Partners
            </NavLink>
            <NavLink to="/connections" className={linkClasses}>
              Connections
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;