import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard.jsx';

export default function ShowEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error handling state

  // Fetch events data
  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/event/all');
      
      // Check if response is valid JSON
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response from the server');
      }

      const data = await response.json();
      setEvents(data);
    } catch (error) {
      setError('Failed to fetch events: ' + error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Delete event handler
  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
  };

  // useEffect to fetch events on page load
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">All Events</h2>

      {loading ? (
        <p className="text-center text-lg">Loading events...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-600">{error}</p>
      ) : events.length === 0 ? (
        <p className="text-center text-lg">No events available right now.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {events.map((event) => (
            <EventCard key={event._id} event={event} onDelete={handleDeleteEvent} />
          ))}
        </div>
      )}
    </main>
  );
}

