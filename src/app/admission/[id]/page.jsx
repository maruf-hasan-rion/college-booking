"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AdmissionForm() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      collegeId: id,
      submittedAt: new Date().toISOString(),
    };
    const res = await fetch(`http://localhost:3000/api/admission`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);

    if (result.insertedId) {
      toast.success("Admission Successful!");
      router.push("/myCollege");
    } else {
      alert("Submission failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Admission Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="label font-medium">
            Candidate Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Candidate Name"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="label font-medium">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Subject"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="label font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="label font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="Phone Number"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="address" className="label font-medium">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Address"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="dob" className="label font-medium">
            Date of Birth
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            className="input input-bordered w-full"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="label font-medium">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            placeholder="Image URL"
            className="input input-bordered w-full"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </div>
  );
}
