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
        onDelete(event._id);
      } else {
        alert(data.message || "Failed to delete event.");
      }
    } catch (error) {
      alert("Error deleting event: " + error.message);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white relative">
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <p className="text-gray-700">
        <strong>Date:</strong>{" "}
        {new Date(event.dateTime).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
      <p className="text-gray-700">
        <strong>Location:</strong> {event.location}
      </p>
      <p className="text-gray-600 mt-2">{event.description}</p>

      {currentAlumni?._id === event.createdBy && (
        <button
          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  );
}
