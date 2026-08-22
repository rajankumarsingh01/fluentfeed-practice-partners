import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? "bg-indigo-600 text-white"
      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
  }`;

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-indigo-600">
              FluentFeed
            </span>
            <span className="hidden sm:inline text-xs text-gray-400">
              Practice Partners
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
            <NavLink to="/find-partners" className={linkClass}>
              Find Partners
            </NavLink>
            <NavLink to="/connections" className={linkClass}>
              Connections
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;