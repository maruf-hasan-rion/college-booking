import React from "react";
import Link from "next/link";

export default async function Colleges() {
  const res = await fetch(`http://localhost:3000/api/colleges`);
  const collegeData = await res.json();
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {collegeData.map((college) => (
        <div className="card w-full bg-base-100 shadow-xl" key={college._id}>
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
              <strong>Total Research:</strong> {college.researchCount}
            </p>
            <div className="card-actions justify-end mt-4">
              <button className="btn text-orange-500">
                <Link href={`/colleges/${college._id}`} className="">
                  See Details
                </Link>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
