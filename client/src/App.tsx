import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import WelcomePage from "./pages/WelcomePage";
import CreateProfile from "./pages/CreateProfile";
import FindPartners from "./pages/FindPartners";
import MyConnections from "./pages/MyConnections";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useUser();
  if (!userId) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/profile" element={<CreateProfile />} />
      <Route
        path="/find-partners"
        element={
          <ProtectedRoute>
            <FindPartners />
          </ProtectedRoute>
        }
      />
      <Route
        path="/connections"
        element={
          <ProtectedRoute>
            <MyConnections />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <UserProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main>
              <AppRoutes />
            </main>
          </div>
        </BrowserRouter>
      </ToastProvider>
    </UserProvider>
  );
}

export default App;