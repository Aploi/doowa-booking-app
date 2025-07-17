import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import BookCourt from "./pages/BookCourt";
import AdminCalendar from "./pages/AdminCalendar";


// 1. Define the modal OUTSIDE HomePage!
function LoginModal({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      onClose();           // Close modal
      navigate("/admin-calendar");  // Redirect to admin schedule page
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-xs w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-2xl leading-none"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              autoFocus
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {error && <div className="text-red-500 mb-3 text-sm">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

function HomePage() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Show the modal if showLogin is true */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

      {/* Header */}
      <header className="bg-white shadow px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Badminton Court Booking</h1>
          <p className="text-gray-600">Book courts or join playing queues across Cebu</p>
        </div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 transition"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
            Register
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto mt-12">
        <h2 className="text-3xl font-semibold text-center mb-2">What would you like to do?</h2>
        <p className="text-center text-gray-500 mb-10">Choose your preferred way to play badminton</p>
        {/* Cards row */}
        <div className="flex flex-col md:flex-row gap-8 justify-center mb-12">
          {/* Book a Court card */}
          <div className="bg-white rounded-xl shadow-md flex-1 p-8 text-center">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 p-3 rounded-full text-blue-700 text-2xl">📅</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Book a Court</h3>
            <ul className="text-gray-600 mb-6 text-left inline-block">
              <li>• Multiple locations available</li>
              <li>• Flexible time slots</li>
              <li>• Private or group bookings</li>
            </ul>
            <button
              className={`w-full py-2 rounded-lg font-semibold mt-2 border transition 
                ${activeCard === "court"
                  ? "bg-white text-black border-black"
                  : "bg-black text-white border-black hover:bg-gray-900"}
              `}
              onClick={() => {
                setActiveCard("court");
                navigate("/book-court");
              }}
            >
              Book a Court
            </button>
          </div>
          {/* Join a Queue card */}
          <div className="bg-white rounded-xl shadow-md flex-1 p-8 text-center">
            <div className="mb-4">
              <span className="inline-block bg-green-100 p-3 rounded-full text-green-700 text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Join a Queue</h3>
            <ul className="text-gray-600 mb-6 text-left inline-block">
              <li>• Match by skill level</li>
              <li>• Find groups near you</li>
              <li>• Connect with players</li>
            </ul>
            <button
              className={`w-full py-2 rounded-lg font-semibold mt-2 border transition 
                ${activeCard === "queue"
                  ? "bg-white text-black border-black"
                  : "bg-black text-white border-black hover:bg-gray-900"}
              `}
              onClick={() => {
                setActiveCard("queue");
                // Future: navigate("/join-queue");
              }}
            >
              Join a Queue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/book-court" element={<BookCourt />} />
      <Route path="/admin-calendar" element={<AdminCalendar />} />
    </Routes>
  );
}

export default App;
