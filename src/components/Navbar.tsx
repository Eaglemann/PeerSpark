import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isTokenExpired } from "../utils/jwt"; // Import the token expiration check
import { useAuthStore } from "../store/auth";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const Navbar = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { logout, token, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      logout();
      navigate("/");
    }
  }, [token, logout, navigate]);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

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
              <Link to="/profile" className="hover:text-blue-600">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/skills" className="hover:text-blue-600">
                Skills
              </Link>
            </li>
            <li>
              <Link to="/matches" className="hover:text-blue-600">
                Matches
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 relative">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="text-gray-700 font-medium hover:underline"
                >
                  {user.name}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-50">
                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                        navigate("/");
                      }}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full hover:bg-blue-50"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsRegisterOpen(true)}
                  className="text-gray-700 border border-gray-300 px-4 py-1 rounded-full hover:bg-gray-100"
                >
                  Register
                </button>
              </>
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
