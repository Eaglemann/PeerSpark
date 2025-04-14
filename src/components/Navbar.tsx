import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 tracking-wide">
          PeerSpark
        </div>
        <ul className="hidden md:flex gap-6 text-gray-600 font-medium">
          <li>
            <Link to="/profile" className="hover:text-blue-600 cursor-pointer">
              Profile
            </Link>
          </li>
          <li className="hover:text-blue-600 cursor-pointer">Skills</li>
          <li className="hover:text-blue-600 cursor-pointer">Matches</li>
        </ul>
        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
          P
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
