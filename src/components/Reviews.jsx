"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [collegeName, setCollegeName] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch("http://localhost:3000/api/admission");
      const data = await res.json();
      //   console.log(data);
      setReviews(data);
      //   if (data.collegeId) {
      //     const res2 = await fetch(
      //       `http://localhost:3000/api/colleges/${data.collegeId}`
      //     );
      //     if (res2.ok) {
      //       const college = await res2.json();
      //       setCollegeName(college.name);
      //       console.log("College Name:", college.name);
      //     }
      //   }
    };
    fetchReviews();
  }, []);

  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        📢 Student Reviews
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((rev) => (
          <div key={rev._id} className="bg-base-200 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-1">{rev._id}</h3>
            <p className="text-sm text-gray-500 mb-2">By {rev.name}</p>
            <div className="flex items-center mb-2">
              {[...Array(rev.review?.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-yellow-400"
                />
              ))}
            </div>
            <p className="text-gray-700">{rev.review?.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
