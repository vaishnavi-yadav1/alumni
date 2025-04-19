import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const { currentAlumni } = useSelector((state) => state.alumni);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    dateTime: "",
    location: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentAlumni) return setError("You must be logged in to create an event");

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/event/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentAlumni.token}`,
        },
        body: JSON.stringify({
          ...formData,
          createdBy: currentAlumni._id,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        navigate("/events"); // Redirect to events page
      } else {
        setError(data.message || "Failed to create event.");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Create Event</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="title"
          placeholder="Event Title"
          required
          className="border p-3 rounded"
          onChange={handleChange}
          value={formData.title}
        />
        <input
          type="datetime-local"
          id="dateTime"
          required
          className="border p-3 rounded"
          onChange={handleChange}
          value={formData.dateTime}
        />
        <input
          type="text"
          id="location"
          placeholder="Location"
          required
          className="border p-3 rounded"
          onChange={handleChange}
          value={formData.location}
        />
        <textarea
          id="description"
          placeholder="Description"
          required
          className="border p-3 rounded"
          rows="4"
          onChange={handleChange}
          value={formData.description}
        ></textarea>
        <button className="bg-blue-600 text-white p-3 rounded hover:opacity-90">
          {loading ? "Creating..." : "Create Event"}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}

