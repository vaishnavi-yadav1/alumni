import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserStart, updateUserSuccess, updateUserFailure } from "../redux/alumni/alumniSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const { currentAlumni, loading, error } = useSelector((state) => state.alumni);

  const [formData, setFormData] = useState({
    name: currentAlumni?.name || "",
    email: currentAlumni?.email || "",
    graduationYear: currentAlumni?.graduationYear || "",
    department: currentAlumni?.department || "",
    currentJob: currentAlumni?.currentJob || "",
    company: currentAlumni?.company || "",
    industry: currentAlumni?.industry || "",
    experience: currentAlumni?.experience || "",
    avatar: currentAlumni?.avatar || "",
  });

  const [uploading, setUploading] = useState(false);
  const [updateError, setUpdateError] = useState("");
  const [success, setSuccess] = useState(false);

  // 🔹 Handle Image Upload
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageFormData = new FormData();
    imageFormData.append("file", file);
    imageFormData.append("upload_preset", "alumni_project");

    setUploading(true);
    setUpdateError("");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvwmncoxn/image/upload",
        { method: "POST", body: imageFormData }
      );
      const data = await response.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, avatar: data.secure_url }));
      } else {
        throw new Error("Failed to upload image. Please try again.");
      }
    } catch (error) {
      console.error("Image Upload Failed:", error);
      setUpdateError(error.message || "Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Profile Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateError("");
    setSuccess(false);
    dispatch(updateUserStart()); // Start loading state

    try {
      const response = await fetch(`/api/user/update/${currentAlumni._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentAlumni.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Update failed.");

      dispatch(updateUserSuccess(data)); // Update Redux store
      setSuccess("Profile updated successfully!");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateError(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5ECE1] text-[#3D2B1F] p-4">
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-lg w-full max-w-lg border border-[#C8A27C]">
        <h2 className="text-3xl font-semibold text-center mb-6 text-[#6D4C41]">Profile</h2>

        {/* Profile Image Upload */}
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleImageChange} />
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            {uploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-full">
                <span className="text-[#6D4C41] font-semibold">Uploading...</span>
              </div>
            )}
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt="Profile"
              className={`h-24 w-24 rounded-full border-2 border-[#6D4C41] object-cover bg-gray-200 cursor-pointer ${
                uploading ? "opacity-50" : ""
              }`}
            />
          </div>

          {/* Error Message for Image Upload */}
          {updateError && <p className="text-red-600 mt-2 text-sm">{updateError}</p>}
        </div>

        {/* Profile Form */}
        <form className="flex flex-col space-y-4" onSubmit={handleUpdate}>
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
          <button
            type="submit"
            className="bg-[#A67B5B] text-white rounded-lg p-3 uppercase hover:bg-[#8C5F42] transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {/* Success/Error Messages */}
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
          {success && <p className="text-green-600 mt-2 text-sm">{success}</p>}
        </form>

        {/* Delete & Sign Out Buttons */}
        <div className="flex justify-between mt-6">
          <button className="text-red-600 font-semibold hover:underline">Delete Account</button>
          <button className="text-red-600 font-semibold hover:underline">Sign Out</button>
        </div>
      </div>
    </div>
  );
}
