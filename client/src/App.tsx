import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreateProfile from "./pages/CreateProfile";
import FindPartners from "./pages/FindPartners";
import MyConnections from "./pages/MyConnections";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/profile" element={<CreateProfile />} />
            <Route path="/find-partners" element={<FindPartners />} />
            <Route path="/connections" element={<MyConnections />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;