import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
 // Import the logout action

export default function Profile() {
  const dispatch = useDispatch();
  const { currentAlumni } = useSelector((state) => state.alumni);

  const [formData, setFormData] = useState({
    name: currentAlumni?.name || "",
    email: currentAlumni?.email || "",
    graduationYear: currentAlumni?.graduationYear || "",
    department: currentAlumni?.department || "",
    currentJob: currentAlumni?.currentJob || "",
    company: currentAlumni?.company || "",
    industry: currentAlumni?.industry || "",
    experience: currentAlumni?.experience || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5ECE1] text-[#3D2B1F] p-4">
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-lg border border-[#C8A27C]">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#6D4C41]">Profile</h2>

        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={currentAlumni?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
            alt="Profile"
            className="h-24 w-24 rounded-full border-2 border-[#6D4C41] object-cover bg-gray-200"
          />
        </div>

        {/* Profile Form */}
        <form className="flex flex-col space-y-4">
          {[
            { name: "name", type: "text", placeholder: "Full Name" },
            { name: "email", type: "text", placeholder: "Email" },
            { name: "graduationYear", type: "number", placeholder: "Graduation Year" },
            { name: "department", type: "text", placeholder: "Department" },
            { name: "currentJob", type: "text", placeholder: "Current Job" },
            { name: "company", type: "text", placeholder: "Company" },
            { name: "industry", type: "text", placeholder: "Industry" },
            { name: "experience", type: "number", placeholder: "Experience (Years)" },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="border border-[#C8A27C] p-3 rounded-lg w-full focus:border-[#A67B5B] focus:ring-[#A67B5B] focus:ring-1 outline-none"
            />
          ))}

          {/* Update Button */}
          <button className="bg-[#A67B5B] text-white rounded-lg p-3 uppercase hover:bg-[#8C5F42] transition">
            Update Profile
          </button>
        </form>

        {/* Delete & Sign Out Buttons */}
        <div className="flex justify-between mt-6">
          <button
           
            className="text-red-600 font-semibold hover:underline"
          >
            Delete Account
          </button>
          <button
           
            className="text-[#6D4C41] font-semibold hover:underline"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
