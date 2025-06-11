import React from "react";

const featuredAlumni = [
  {
    name: "Dr. Aarti Sharma",
    domain: "AI Research | Google Brain",
    achievement: "Published 20+ papers in top-tier AI conferences.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rahul Verma",
    domain: "Entrepreneur | Fintech",
    achievement: "Founded a unicorn startup disrupting the payments space.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sneha Iyer",
    domain: "Software Engineer | Microsoft",
    achievement: "Lead developer for Teams integration across Microsoft 365.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-gray-800">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-3">About Us</h1>

      {/* One-line College Intro */}
      <p className="text-center text-lg text-gray-600 mb-12">
        Connecting excellence from our classrooms to the world.
      </p>

     {/* 🌟 Featured Alumni Section */}
<section className="mb-16">
  <h2 className="text-2xl font-semibold text-blue-500 mb-8">
    Meet Our Proud Alumni
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {featuredAlumni.map((alumni, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-lg p-5 text-center hover:shadow-xl transition duration-300"
      >
        <img
          src={alumni.image}
          alt={alumni.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h3 className="text-lg font-semibold">{alumni.name}</h3>
        <p className="text-blue-500">{alumni.domain}</p>
        <p className="mt-2 text-gray-600 text-sm">{alumni.achievement}</p>
      </div>
    ))}
  </div>
</section>


      {/* Alumni Association Info */}
      <section className="bg-gray-100 rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-semibold text-blue-500 mb-3">About Our Alumni Association</h2>
        <p className="text-lg leading-relaxed">
          Our Alumni Association is dedicated to building a strong and supportive network of former students who have passed through the esteemed halls of our college. We aim to foster lifelong relationships, provide professional support, and create opportunities for giving back to the institution that helped shape our journeys.
        </p>
      </section>

      {/* College Overview */}
      <section className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-2xl font-semibold text-blue-500 mb-3">About Our College</h2>
        <p className="text-lg leading-relaxed">
          Established in [Year], our college has been a beacon of excellence in education, innovation, and holistic development. With a rich tradition of academic success, the institution offers a wide range of programs across disciplines.
        </p>
      </section>

      {/* Achievements */}
      <section className="bg-gray-100 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-blue-500 mb-3">College Achievements</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
          <li>Ranked among the top 10 engineering colleges in the state.</li>
          <li>Over 95% placement rate across all departments.</li>
          <li>Accredited with NAAC ‘A+’ grade and ISO 9001 certification.</li>
          <li>More than 250 research publications by faculty.</li>
        </ul>
      </section>
    </div>
  );
}
