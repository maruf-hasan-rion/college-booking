"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const [user, setUser] = useState(null);
  const [collegeName, setCollegeName] = useState("");
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    university: "",
    address: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`http://localhost:3000/api/user/${userEmail}`);
      const data = await res.json();
      setUser(data);
      setFormData(data);
      if (data.university) {
        const res2 = await fetch(`/api/colleges/${data.university}`);
        if (res2.ok) {
          const college = await res2.json();
          setCollegeName(college.name); // save name for display
          console.log("College Name:", college.name);
        }
      }
    };
    fetchUser();
  }, [userEmail]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const res = await fetch(`http://localhost:3000/api/user/${userEmail}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setEdit(false);
      const updated = await res.json();
      setUser({ ...formData });
      toast.success("Profile updated successfully!");
    }
    if (formData.university) {
      const res2 = await fetch(`/api/colleges/${formData.university}`);
      if (res2.ok) {
        const college = await res2.json();
        setCollegeName(college.name);
      }
    }
  };

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="card bg-base-200 p-6">
        {!edit ? (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>University:</strong> {collegeName}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <button
              className="btn btn-outline mt-4"
              onClick={() => setEdit(true)}
            >
              Edit
            </button>
          </>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Name"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                name="email"
                value={formData.email}
                disabled
                className="input input-bordered w-full bg-gray-100"
                placeholder="Email"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">University</span>
              </label>
              <input
                name="university"
                value={formData.university}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="University"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Address</span>
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="Address"
              />
            </div>

            <div className="flex gap-3 mt-4">
              <button className="btn btn-success" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-ghost" onClick={() => setEdit(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
