"use client";

import { useEffect, useState } from "react";

export default function ImageGallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch("http://localhost:3000/api/colleges");
      const data = await res.json();
      setImages(data);
    };
    fetchGallery();
  }, []);

  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        🎓 College Graduates Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            <img
              src={img.image}
              alt={img.altText || "College Graduates"}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
