import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const { position, company, workType, experience, salary, location, lastDateToApply } = job;

  // Format the last date to apply
  const formattedDate = new Date(lastDateToApply).toLocaleDateString("en-IN", {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Create a dynamic URL using company and position
  const jobDetailsLink = `/jobs/${company.toLowerCase().replace(/\s+/g, '-')}/${position.toLowerCase().replace(/\s+/g, '-')}`;

  // Create a Google search link using company and position
  const googleSearchLink = `https://www.google.com/search?q=${encodeURIComponent(position)}+at+${encodeURIComponent(company)}`;

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-xl font-semibold">{position}</h3>
      <p className="text-gray-500">{company}</p>
      <p className="text-gray-600">{location}</p>
      <p className="text-gray-600">Experience: {experience} years</p>
      <p className="text-gray-600">Salary: ₹{salary}</p>
      <p className="text-gray-600">Work Type: {workType}</p>

      {/* Display Last Date to Apply */}
      <p className="text-red-500 font-semibold mt-2">
        Last Date to Apply: {formattedDate}
      </p>

      <div className="mt-4">
     
        <div className="mt-2">
          {/* Google Search Link */}
          <a
            href={googleSearchLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            view details
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;


