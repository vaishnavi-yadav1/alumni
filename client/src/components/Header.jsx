import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentAlumni } = useSelector((state) => state.alumni);
  const [menuOpen, setMenuOpen] = useState(false);

  console.log("Avatar URL:", currentAlumni?.avatar); // Debugging log

  return (
    <header className="bg-[#B89F8F] shadow-md text-[#3D2B1F]">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          Alumni Connect
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-[#6D4C41] transition">Home</Link>
          <Link to="/about" className="hover:text-[#6D4C41] transition">About Us</Link>
          <Link to="/directory" className="hover:text-[#6D4C41] transition">Alumni Directory</Link>
          <Link to="/event" className="hover:text-[#6D4C41] transition">Events</Link>
          <Link to="/donate" className="hover:text-[#6D4C41] transition">Donate</Link>

          {currentAlumni ? (
            <Link to="/profile">
              <img
                src={currentAlumni.avatar || "/default-avatar.png"} // Fallback if missing
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 object-cover"
                onError={(e) => (e.target.src = "/default-avatar.png")} // Handle broken image
              />
            </Link>
          ) : (
            <Link to="/signin" className="hover:text-[#6D4C41] transition">Sign In</Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#3D2B1F] text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-[#CBB9A8] text-[#3D2B1F] p-4 flex flex-col space-y-4">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
          <Link to="/directory" onClick={() => setMenuOpen(false)}>Alumni Directory</Link>
          <Link to="/event" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link to="/donate" onClick={() => setMenuOpen(false)}>Donate</Link>

          {currentAlumni ? (
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              <img
                src={currentAlumni.avatar || "/default-avatar.png"}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 object-cover bg-white shadow-md"
                onError={(e) => (e.target.src = "/default-avatar.png")} // Handle broken image
              />
            </Link>
          ) : (
            <Link to="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link>
          )}
        </nav>
      )}
    </header>
  );
}
