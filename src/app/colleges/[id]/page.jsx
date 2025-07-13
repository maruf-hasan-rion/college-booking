import React from "react";

export default async function CollegeDetailsPage({ params }) {
  const p = await params;
  const res = await fetch(`http://localhost:3000/api/colleges/${p.id}`);
  const college = await res.json();

  return (
    <div className="card w-96 bg-base-100 shadow-xl mx-auto mt-10">
      <figure>
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-60 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{college.name}</h2>
        <p>
          <strong>Admission Date:</strong> {college.admissionDate}
        </p>
        <p>
          <strong>Rating:</strong> ⭐ {college.rating}
        </p>

        <p>
          <strong>Research History:</strong> {college.researchHistory}
        </p>
        <p>
          <strong>Total Research:</strong> {college.researchCount}
        </p>
        <p>
          <strong>Events:</strong> {college.events.slice(0, 2).join(", ")}...
        </p>
        <p>
          <strong>Sports:</strong> {college.sports.join(", ")}
        </p>
      </div>
    </div>
  );
}
