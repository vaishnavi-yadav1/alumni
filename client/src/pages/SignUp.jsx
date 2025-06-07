import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    graduationYear: "",
    department: "",
    branch: "", // ✅ added branch
    currentJob: "",
    company: "",
    industry: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get("content-type");
      let data = {};

      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/signin");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E8F0F2]">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg w-full max-w-md border border-[#AAC4C8]">
        <h2 className="text-2xl font-bold text-center text-[#1E3A8A]">Alumni Sign Up</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          {[
            { label: "Full Name", name: "name", type: "text", required: true },
            { label: "Email", name: "email", type: "email", required: true },
            { label: "Password", name: "password", type: "password", required: true },
            { label: "Graduation Year", name: "graduationYear", type: "number", required: true },
            { label: "Department", name: "department", type: "text", required: true },
            { label: "Branch", name: "branch", type: "text", required: true },
            { label: "Current Job", name: "currentJob", type: "text" },
            { label: "Company", name: "company", type: "text" },
            { label: "Industry", name: "industry", type: "text" },
            { label: "Experience (Years)", name: "experience", type: "number", required: true },
          ].map(({ label, name, type, required }) => (
            <div className="flex flex-col" key={name}>
              <label className="text-[#1E3A8A]">{label}</label>
              <input
                type={type}
                name={name}
                required={required}
                className="input-field border p-2 rounded-md"
                onChange={handleChange}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-2 rounded-md hover:bg-[#1E40AF] transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {error && <p className="text-red-600 text-center mt-2">{error}</p>}

        <p className="text-sm text-[#1E3A8A] text-center mt-4">
          Already have an account?{" "}
          <Link to="/signin" className="text-[#2563EB] hover:text-[#1E40AF]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
