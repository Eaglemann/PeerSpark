import { Link } from "react-router-dom";
import { useState } from "react";
import RegisterModal from "./RegisterModal"; // adjust path as needed

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 border border-blue-600 px-4 py-1 rounded-full hover:bg-blue-50"
            >
              Login
            </button>
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              P
            </div>
          </div>
        </div>
      </nav>
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
