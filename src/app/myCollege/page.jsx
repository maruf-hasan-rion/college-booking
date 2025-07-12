"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyCollegePage() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const admissionRes = await fetch(
          `http://localhost:3000/api/myCollege/${userEmail}`
        );
        const admissionData = await admissionRes.json();

        if (admissionData?.collegeId) {
          const collegeRes = await fetch(
            `http://localhost:3000/api/colleges/${admissionData.collegeId}`
          );
          const collegeData = await collegeRes.json();
          console.log(collegeData);
          setCollege(collegeData);
        }
      } catch (error) {
        console.error("Error fetching college info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, []);

  const submitReview = async () => {
    const res = await fetch("http://localhost:3000/api/myCollege/review", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, reviewText: review, rating }),
    });

    const result = await res.json();
    if (result.success) {
      toast.success("Review submitted!");
      setData((prev) => ({
        ...prev,
        review: { text: review, rating },
      }));
      setReview("");
      setRating("");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading your college...</p>;
  if (!college)
    return <p className="text-center mt-10 text-red-500">No college found.</p>;
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-xl font-bold mb-2">My College Details</h2>
      <div className="card bg-base-200 shadow-lg p-6">
        <img
          src={college.image}
          alt={college.name}
          className="w-full rounded mb-4"
        />
        <h3 className="text-xl font-semibold">{college.name}</h3>
        <p>
          <strong>Rating:</strong> ⭐ {college.rating}
        </p>
        <p>
          <strong>Admission Date:</strong> {college.admissionDate}
        </p>
        <p>
          <strong>Research History:</strong> {college.researchHistory}
        </p>
        <p>
          <strong>Events:</strong> {college.events?.join(", ")}
        </p>
        <p>
          <strong>Sports:</strong> {college.sports?.join(", ")}
        </p>
      </div>

      {!college.review && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Add a Review with Rating</h3>
          <textarea
            className="textarea textarea-bordered w-full mb-2"
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <select
            className="select select-bordered w-full mb-2"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="">Select rating</option>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Very Poor</option>
          </select>
          <button onClick={submitReview} className="btn bg-orange-500">
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
}
