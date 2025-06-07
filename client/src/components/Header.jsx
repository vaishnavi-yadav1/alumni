import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentAlumni } = useSelector((state) => state.alumni);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md text-[#111827] font-sans">
      <div className="max-w-6xl mx-auto p-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold tracking-tight text-[#1a7ada] hover:text-[#2563EB] transition-colors duration-300">
          Alumni Connect
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-[#374151] hover:text-[#1a7ada] transition-colors duration-300 font-medium">
            Home
          </Link>
          <Link to="/about" className="text-[#374151] hover:text-[#1a7ada] transition-colors duration-300 font-medium">
            About Us
          </Link>
          <Link to="/directory" className="text-[#374151] hover:text-[#1a7ada] transition-colors duration-300 font-medium">
            Alumni Directory
          </Link>
          <Link to="/event" className="text-[#374151] hover:text-[#1a7ada] transition-colors duration-300 font-medium">
            Events
          </Link>
          <Link to="/donate" className="text-[#374151] hover:text-[#1a7ada] transition-colors duration-300 font-medium">
            Donate
          </Link>

          {currentAlumni ? (
            <Link to="/profile" className="ml-4">
              <img
                src={currentAlumni.avatar || "/default-avatar.png"}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-[#1a7ada] object-cover shadow-sm"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
            </Link>
          ) : (
            <Link to="/signin" className="text-[#374151] hover:text-[#1a7ada] transition-colors duration-300 font-medium">
              Sign In
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#1a7ada] text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[#F3F4F6] text-[#111827] p-6 flex flex-col space-y-4 border-t border-gray-200">
          <Link to="/" onClick={() => setMenuOpen(false)} className="font-medium hover:text-[#1a7ada] transition-colors duration-300">
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="font-medium hover:text-[#1a7ada] transition-colors duration-300">
            About Us
          </Link>
          <Link to="/directory" onClick={() => setMenuOpen(false)} className="font-medium hover:text-[#1a7ada] transition-colors duration-300">
            Alumni Directory
          </Link>
          <Link to="/event" onClick={() => setMenuOpen(false)} className="font-medium hover:text-[#1a7ada] transition-colors duration-300">
            Events
          </Link>
          <Link to="/donate" onClick={() => setMenuOpen(false)} className="font-medium hover:text-[#1a7ada] transition-colors duration-300">
            Donate
          </Link>

          {currentAlumni ? (
            <Link to="/profile" onClick={() => setMenuOpen(false)} className="pt-2">
              <img
                src={currentAlumni.avatar || "/default-avatar.png"}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 border-[#1a7ada] object-cover shadow-sm bg-white"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
            </Link>
          ) : (
            <Link to="/signin" onClick={() => setMenuOpen(false)} className="font-medium hover:text-[#1a7ada] transition-colors duration-300">
              Sign In
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}
