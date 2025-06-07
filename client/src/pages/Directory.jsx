import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Directory = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    company: "",
    industry: "",
    experience: "",
  });
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [emailBody, setEmailBody] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const fetchAlumni = async (queryParams = "") => {
    try {
      const apiUrl = queryParams ? `/api/user/search${queryParams}` : `/api/user/directory`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setAlumniList(data);
      } else {
        console.log("Error fetching alumni data:", data.message);
      }
    } catch (error) {
      console.log("Error fetching alumni data:", error.message);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const updatedQuery = {
      name: params.get("name") || "",
      company: params.get("company") || "",
      industry: params.get("industry") || "",
      experience: params.get("experience") || "",
    };

    setSearchQuery(updatedQuery);
    fetchAlumni(location.search ? `?${params.toString()}` : "");
  }, [location.search]);

  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [id]: value,
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filteredQuery = Object.fromEntries(
      Object.entries(searchQuery).filter(([_, value]) => value.trim() !== "")
    );
    const queryParams = new URLSearchParams(filteredQuery).toString();
    navigate(queryParams ? `/search?${queryParams}` : "/directory");
  };

  const openMailModal = (alumni) => {
    setSelectedAlumni(alumni);
    setEmailBody("");
  };

  const closeModal = () => {
    setSelectedAlumni(null);
  };

  const sendEmail = () => {
    if (selectedAlumni && selectedAlumni.email) {
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(selectedAlumni.email)}&su=Hello ${encodeURIComponent(selectedAlumni.name)}&body=${encodeURIComponent(emailBody)}`;
      window.open(gmailLink, "_blank");
      closeModal();
    } else {
      alert("Recipient email is missing! Check alumni data.");
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <div className="flex">
        {/* Search Box */}
        <div className="flex flex-col flex-1 p-5 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold">Search Alumni</h2>
          <form onSubmit={handleSearchSubmit}>
            <input type="text" id="name" placeholder="Name" value={searchQuery.name} onChange={handleSearchChange} className="border p-3 rounded-lg mt-4 w-full" />
            <input type="text" id="company" placeholder="Company" value={searchQuery.company} onChange={handleSearchChange} className="border p-3 rounded-lg mt-4 w-full" />
            <input type="text" id="industry" placeholder="Industry" value={searchQuery.industry} onChange={handleSearchChange} className="border p-3 rounded-lg mt-4 w-full" />
            <input type="text" id="experience" placeholder="Experience" value={searchQuery.experience} onChange={handleSearchChange} className="border p-3 rounded-lg mt-4 w-full" />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-4 w-full">Search</button>
          </form>
        </div>

        {/* Alumni List */}
        <div className="flex-2 p-5 bg-white rounded-lg ml-6">
          <h2 className="text-xl font-semibold mb-4">Alumni Directory</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {alumniList.length > 0 ? (
              alumniList.map((alumni, index) => (
                <div key={index} className="p-4 border rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg">{alumni.name}</h3>
                  <p><strong>Experience:</strong> {alumni.experience}</p>
                  <p><strong>Company:</strong> {alumni.company}</p>
                  <p><strong>Industry:</strong> {alumni.industry}</p>
                  <button onClick={() => openMailModal(alumni)} className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Send Mail</button>
                </div>
              ))
            ) : (
              <p>No alumni found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {selectedAlumni && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-2">Send Mail to {selectedAlumni.name}</h2>
            <textarea rows="4" placeholder="Type your message here..." value={emailBody} onChange={(e) => setEmailBody(e.target.value)} className="w-full border p-2 rounded-lg"></textarea>
            <div className="flex justify-end mt-3">
              <button onClick={closeModal} className="bg-gray-400 text-white py-2 px-4 rounded-lg mr-2">Cancel</button>
              <button onClick={sendEmail} className="bg-blue-500 text-white py-2 px-4 rounded-lg">Send</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Directory;
