import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import JobCard from "../components/JobCard";

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    company: "",
    salary: "",
    location: "",
    workType: "",
    experience: "",
  });
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch jobs data
  const fetchJobs = async (queryParams = "") => {
    try {
      const apiUrl = queryParams ? `/api/job/listings${queryParams}` : `/api/job/listings`;  // API Endpoint for job listings
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        setJobs(data);  // Save the full list of jobs
        setFilteredJobs(data);  // Initially display all jobs
      } else {
        console.log("Error fetching jobs data:", data.message);
      }
    } catch (error) {
      console.log("Error fetching jobs data:", error.message);
    }
  };

  // Read URL parameters and fetch jobs accordingly
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const updatedQuery = {
      company: params.get("company") || "",
      salary: params.get("salary") || "",
      location: params.get("location") || "",
      workType: params.get("workType") || "",
      experience: params.get("experience") || "",
    };

    setSearchQuery(updatedQuery); // Set search query state
    fetchJobs(location.search ? `?${params.toString()}` : "");  // Fetch jobs based on URL params
  }, [location.search]);

  // Handle input changes for search fields
  const handleSearchChange = (e) => {
    const { id, value } = e.target;
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [id]: value,
    }));
  };

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Build query params for the search
    const filteredQuery = Object.fromEntries(
      Object.entries(searchQuery).filter(([_, value]) => value.trim() !== "")
    );
    const queryParams = new URLSearchParams(filteredQuery).toString();

    navigate(queryParams ? `/jobs?${queryParams}` : "/jobs");
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <div className="flex">
        {/* Search Box */}
        <div className="flex flex-col flex-1 p-5 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold">Search Jobs</h2>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              id="company"
              placeholder="Company"
              value={searchQuery.company}
              onChange={handleSearchChange}
              className="border p-3 rounded-lg mt-4 w-full"
            />
            <input
              type="text"
              id="salary"
              placeholder="Salary"
              value={searchQuery.salary}
              onChange={handleSearchChange}
              className="border p-3 rounded-lg mt-4 w-full"
            />
            <input
              type="text"
              id="location"
              placeholder="Location"
              value={searchQuery.location}
              onChange={handleSearchChange}
              className="border p-3 rounded-lg mt-4 w-full"
            />
            <input
              type="text"
              id="workType"
              placeholder="Work Type"
              value={searchQuery.workType}
              onChange={handleSearchChange}
              className="border p-3 rounded-lg mt-4 w-full"
            />
            <input
              type="text"
              id="experience"
              placeholder="Experience"
              value={searchQuery.experience}
              onChange={handleSearchChange}
              className="border p-3 rounded-lg mt-4 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-4 w-full">
              Search
            </button>
          </form>
        </div>

        {/* Job Listings */}
        <div className="flex-2 p-5 bg-white rounded-lg ml-6">
          <h2 className="text-xl font-semibold mb-4">Job Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <p>No jobs found.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobListingsPage;


