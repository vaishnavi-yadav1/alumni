import React from 'react';
import { useSelector } from 'react-redux';

export default function EventCard({ event, onDelete }) {
  const { currentAlumni } = useSelector((state) => state.alumni);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/event/delete/${event._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentAlumni?.token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        onDelete(event._id); // Notify parent to update UI
      } else {
       console.log(data.message);
      }
    } catch (error) {
    console.log(error.message);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-gray-50 relative">
      <h3 className="text-lg font-semibold">{event.title}</h3>
      <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p className="text-sm text-gray-600 mt-2">{event.description}</p>

      {/* View link (optional, if you want a link to event details) */}
      <a
        href={`https://www.google.com/search?q=${event.title}+${event.location}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mt-2 block"
      >
        View Details
      </a>

      {/* Show delete button only if current user is the owner */}
      {currentAlumni?._id === event.createdBy && (
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
