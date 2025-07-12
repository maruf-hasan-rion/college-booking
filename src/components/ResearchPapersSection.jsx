"use client";

import { useEffect, useState } from "react";

export default function ResearchPapersSection() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
      const res = await fetch("http://localhost:3000/api/research");
      const data = await res.json();
      setPapers(data);
    };
    fetchPapers();
  }, []);

  return (
    <section className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        📚 Research Papers by College Students
      </h2>
      <ul className="space-y-4">
        {papers.map((paper) => (
          <li
            key={paper._id}
            className="p-4 bg-base-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <a
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {paper.title}
            </a>
            <p className="text-sm text-gray-600">
              Author: {paper.author} | College: {paper.college}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
