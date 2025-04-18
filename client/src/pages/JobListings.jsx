import React, { useState, useEffect } from "react";
import JobCard from "../components/JobCard.jsx";

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch job data
  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/job/listings'); // Fetch all jobs without query params
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

  // useEffect to fetch data on page load
  useEffect(() => {
    fetchJobs(); // Fetch jobs without query params
  }, []);

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <div className="flex flex-wrap gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </main>
  );
};

export default JobListingsPage;




