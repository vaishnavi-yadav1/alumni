import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard.jsx";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch job data
  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/job/listings");
      const data = await response.json();

      if (response.ok) {
        setJobs(data);
      } else {
        console.log("Error fetching jobs:", data.message);
      }
    } catch (error) {
      console.log("Error fetching jobs:", error.message);
    }
  };

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <div className="p-5 bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Job Listings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job._id} job={job} />)
          ) : (
            <p>No jobs found.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default JobListings;



