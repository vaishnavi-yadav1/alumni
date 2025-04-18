import React, { useState } from "react";
import { useSelector } from 'react-redux';

export default function CreateJob() {
  const { currentAlumni } = useSelector(state => state.alumni);

  const [formData, setFormData] = useState({
    position: "",
    company: "",
    workType: "",
    experience: "",
    salary: "",
    location: "",
    lastDateToApply: "",  // New field for the last date to apply
  });

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    if(!currentAlumni) console.log("not found");
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const res = await fetch('/api/job/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentAlumni._id, 
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      } else {
        // Reset form fields after successful job posting
        setFormData({
          position: "",
          company: "",
          workType: "",
          experience: "",
          salary: "",
          location: "",
          lastDateToApply: "",  // Reset last date field
        });
      }

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Post a Job</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Position"
          className="border p-3 rounded-lg"
          id="position"
          required
          onChange={handleChange}
          value={formData.position}
        />
        <input
          type="text"
          placeholder="Company"
          className="border p-3 rounded-lg"
          id="company"
          required
          onChange={handleChange}
          value={formData.company}
        />
        <input
          type="number"
          placeholder="Experience (in years)"
          className="border p-3 rounded-lg"
          id="experience"
          required
          onChange={handleChange}
          value={formData.experience}
        />
        <input
          type="number"
          placeholder="Salary (INR)"
          className="border p-3 rounded-lg"
          id="salary"
          required
          onChange={handleChange}
          value={formData.salary}
        />
        <input
          type="text"
          placeholder="Location"
          className="border p-3 rounded-lg"
          id="location"
          required
          onChange={handleChange}
          value={formData.location}
        />
        <select
          id="workType"
          className="border p-3 rounded-lg"
          required
          onChange={handleChange}
          value={formData.workType}
        >
          <option value="">Select Work Type</option>
          <option value="Remote">Remote</option>
          <option value="On-site">On-site</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        <input
          type="date"
          placeholder="Last Date to Apply"
          className="border p-3 rounded-lg"
          id="lastDateToApply"
          required
          onChange={handleChange}
          value={formData.lastDateToApply}
        />
        <button
          className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95"
        >
          {loading ? 'Creating...' : 'Create Job'}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </main>
  );
}

