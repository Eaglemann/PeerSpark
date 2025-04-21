import { Link } from "react-router-dom";
import { useState } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useAuthStore } from "../store/auth";

const Navbar = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout } = useAuthStore();

  return (
    <>
      <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 tracking-wide"
          >
            PeerSpark
          </Link>
          <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
            <li>
              <Link
                to="/profile"
                className="hover:text-blue-600 cursor-pointer"
              >
                Profile
              </Link>
            </li>
            <Link to="/skills" className="hover:text-blue-600 cursor-pointer">
              <li className="hover:text-blue-600 cursor-pointer">Skills</li>
            </Link>
            <Link to="/matches" className="hover:text-blue-600 cursor-pointer">
              <li className="hover:text-blue-600 cursor-pointer">Matches</li>
            </Link>
          </ul>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-gray-700 font-medium cursor-pointer hover:underline">
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className="text-red-600 border border-red-600 px-4 py-1 rounded-full hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full hover:bg-blue-50"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
        onLoginSuccess={() => setIsLoginOpen(false)}
      />
    </>
  );
};

export default Navbar;
