import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    graduationYear: "",
    department: "",
    currentJob: "",
    company: "",
    industry: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Signin failed");
      }

      
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5ECE1]">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md border border-[#C8A27C]">
        <h2 className="text-2xl font-bold text-center text-[#6D4C41]">Alumni Sign In</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        
          <div className="flex flex-col">
            <label className="text-[#6D4C41]">Email</label>
            <input type="email" name="email" required className="input-field" onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <label className="text-[#6D4C41]">Password</label>
            <input type="password" name="password" required className="input-field" onChange={handleChange} />
          </div>
          
        
          <button type="submit" disabled={loading} className="w-full bg-[#C8A27C] text-white py-2 rounded-md hover:bg-[#A67B5B] transition">
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

        <p className="text-sm text-[#6D4C41] text-center mt-4">
          Do not have an account? <Link to="/signup" className="text-[#A67B5B] hover:text-[#C8A27C]">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;