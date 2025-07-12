"use client";

import { useEffect, useState } from "react";

export default function CollegeSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [colleges, setColleges] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchColleges = async () => {
      const res = await fetch("http://localhost:3000/api/colleges");
      const data = await res.json();
      setColleges(data);
      setFiltered(data);
    };
    fetchColleges();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const results = colleges.filter((college) =>
      college.name.toLowerCase().includes(term)
    );
    setFiltered(results);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a college..."
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full"
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((college) => (
            <div key={college._id} className="card bg-base-100 shadow-md">
              <figure>
                <img
                  src={college.image}
                  alt={college.name}
                  className="h-40 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{college.name}</h2>
                <p className="text-sm">🎓 Admission: {college.admissionDate}</p>
                <p className="text-sm">⭐ Rating: {college.rating}</p>
                <p className="text-sm">
                  📚 Researches: {college.researchCount}
                </p>
                <div className="card-actions justify-end mt-2">
                  <a
                    href={`/colleges/${college._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-red-500">No colleges found.</p>
      )}
    </div>
  );
}
