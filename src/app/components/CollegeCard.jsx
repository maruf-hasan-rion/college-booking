"use client";

import React from "react";

export default function CollegeCard({ college }) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
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
          <strong>Events:</strong> {college.events.slice(0, 2).join(", ")}...
        </p>
        <p>
          <strong>Total Research:</strong> {college.researchCount}
        </p>
        <p>
          <strong>Sports:</strong> {college.sports.join(", ")}
        </p>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary">Details</button>
        </div>
      </div>
    </div>
  );
}
