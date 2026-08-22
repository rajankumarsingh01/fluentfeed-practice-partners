import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext.tsx";

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-brand-500 text-white shadow-sm shadow-brand-500/30"
      : "text-slate-600 hover:bg-brand-50 hover:text-brand-600"
  }`;

const mobileLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
    isActive ? "bg-brand-500 text-white" : "text-slate-600 hover:bg-brand-50"
  }`;

const Navbar = () => {
  const { userId } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            FF
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">
            FluentFeed
          </span>
        </div>

        {userId && (
          <>
            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-1 sm:gap-2">
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

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="sm:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-5 h-0.5 bg-current rounded-full transition-transform ${
                    open ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current rounded-full transition-opacity ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-current rounded-full transition-transform ${
                    open ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Mobile dropdown */}
      {userId && open && (
        <nav className="sm:hidden border-t border-slate-200 px-4 py-3 space-y-1 bg-white animate-fade-in-up">
          <NavLink to="/profile" className={mobileLinkClasses} onClick={() => setOpen(false)}>
            Profile
          </NavLink>
          <NavLink
            to="/find-partners"
            className={mobileLinkClasses}
            onClick={() => setOpen(false)}
          >
            Find Partners
          </NavLink>
          <NavLink
            to="/connections"
            className={mobileLinkClasses}
            onClick={() => setOpen(false)}
          >
            Connections
          </NavLink>
        </nav>
      )}
    </header>
  );
};

export default Navbar;