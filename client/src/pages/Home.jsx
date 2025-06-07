import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import college1 from '../assets/college1.jpg';
import college2 from '../assets/college2.png';
import studentWalking from '../assets/student walking.jpg';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/event/all");
        const data = await res.json();
        setEvents(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    const fetchJobs = async () => {
      try {
        const res = await fetch("/api/job/listings");
        const data = await res.json();
        setJobs(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchEvents();
    fetchJobs();
  }, []);

  return (
    <main className="bg-[#F9FAFB] text-[#111827] font-sans">
      {/* Welcome Message */}
  <section className="p-8 bg-[#1a7ada] text-[#ffffff] text-center">
  <h1 className="text-4xl font-bold mb-2">Welcome to Our Alumni Network</h1>
  <p className="text-lg max-w-3xl mx-auto">
    Building a global community of alumni, fostering connections, and creating opportunities.
  </p>
</section>


      {/* Gallery Section */}
      <section className="p-10 bg-[#F3F4F6]">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#111827] tracking-tight">
          Campus Gallery
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[college1, college2, studentWalking].map((image, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-xl shadow group aspect-[3/2]"
            >
              <img
                src={image}
                alt={`Highlight ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
{/* Upcoming Events */}
<section className="p-10 bg-white">
  <h2 className="text-3xl font-bold text-center mb-6 text-[#111827] tracking-tight">Upcoming Events</h2>
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {events.map((event) => (
      <div key={event._id} className="p-6 bg-[#F9FAFB] rounded-lg shadow-md border border-[#E5E7EB]">
        <h3 className="text-xl font-semibold mb-1 text-[#111827]">{event.title}</h3>
        <p className="text-sm mb-2 text-gray-500">
          {new Date(event.dateTime).toLocaleDateString()}{" "}
          {new Date(event.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
        <p className="text-sm text-[#374151]">{event.description?.slice(0, 100)}...</p>
      </div>
    ))}
  </div>
  <div className="text-center mt-6">
    <Link to="/event" className="text-[#2563EB] font-medium hover:underline">
      Show More Events
    </Link>
  </div>
</section>

      {/* Job Opportunities */}
      <section className="p-10 bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-[#111827] tracking-tight">Job Opportunities</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div key={job._id} className="p-6 bg-[#F9FAFB] rounded-lg shadow-md border border-[#E5E7EB]">
              <h3 className="text-xl font-semibold mb-1 text-[#111827]">{job.position} at {job.company}</h3>
              <p className="text-sm text-gray-500">Location: {job.location}</p>
              <p className="text-sm text-gray-500">Salary: ₹{job.salary}</p>
              <p className="text-sm text-gray-500">Last Date: {new Date(job.lastDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/show-job" className="text-[#2563EB] font-medium hover:underline">
            Show More Jobs
          </Link>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

