import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center text-center">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Gemini Chat</h1>
          <p className="text-lg mb-6">
            Explore the power of real-time chat with Gemini API.
          </p>
          <img src="../chatbot.svg" alt="Chat" className="mx-auto mb-6 w-64 h-64 object-contain" />
          <p
            className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700"
            onClick={() => navigate("/guest")}
          >
            Login as a Guest and Start Chatting
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Gemini Chat.</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
