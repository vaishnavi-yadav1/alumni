import React from 'react';
import { useSelector } from 'react-redux';

export default function JobCard({ job, onDelete }) {
  const { currentAlumni } = useSelector((state) => state.alumni);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this job listing?")) return;

    try {
      const res = await fetch(`/api/job/delete/${job._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentAlumni.token}`, // if token-based
        },
      });

      const data = await res.json();

      if (res.ok) {
        onDelete(job._id); // Notify parent to update UI
      } else {
        alert(data.message || "Failed to delete job.");
      }
    } catch (error) {
      alert("Error deleting job: " + error.message);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-gray-50 relative">
      <h3 className="text-lg font-semibold">{job.position} at {job.company}</h3>
      <p>Location: {job.location}</p>
      <p>Work Type: {job.workType}</p>
      <p>Experience: {job.experience} years</p>
      <p>Salary: ₹{job.salary}</p>
   

      {/* View link */}
      <a
        href={`https://www.google.com/search?q=${job.company}+${job.position}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mt-2 block"
      >
        View Details
      </a>

      {/* Show delete button only if current user is the owner */}
      {currentAlumni?._id === job.userRef && (
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
}
