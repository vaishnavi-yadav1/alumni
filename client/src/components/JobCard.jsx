// src/components/JobCard.js
import React from 'react';

const JobCard = ({ job }) => {
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h3 className="text-xl font-bold">{job.title}</h3>
      <p className="text-lg">{job.company}</p>
      <p>{job.location}</p>
      <p>Salary: {job.salary ? `${job.salary}` : 'Not disclosed'}</p>
      <p>Work Type: {job.workType}</p>
      <p>Experience Required: {job.experienceRequired}</p>
    </div>
  );
};

export default JobCard;
