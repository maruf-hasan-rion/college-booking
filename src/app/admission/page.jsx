"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdmissionPage() {
  const router = useRouter();
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/colleges");
        const data = await res.json();
        setColleges(data);
      } catch (err) {
        console.error("Failed to fetch colleges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  const handleSelect = (id) => {
    router.push(`/admission/${id}`);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Select a College for Admission</h2>

      {loading ? (
        <p className="text-center mt-10">Loading colleges...</p>
      ) : colleges.length > 0 ? (
        colleges.map((college) => (
          <button
            key={college._id}
            onClick={() => handleSelect(college._id)}
            className="btn btn-outline w-full"
          >
            {college.name}
          </button>
        ))
      ) : (
        <p className="text-red-500">No colleges found.</p>
      )}
    </div>
  );
}
