"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-orange-200 to-yellow-100 text-center p-6">
      <h1 className="text-6xl font-extrabold text-orange-600 mb-4">404</h1>
      <p className="text-2xl font-semibold text-orange-800 mb-2">
        Oops! Page not found 😢
      </p>
      <p className="text-md text-orange-700 mb-6">
        Looks like you wandered off the path. Let’s get you back on track.
      </p>
      {/* <img
        src="https://illustrations.popsy.co/amber/website-error.svg"
        alt="404 Illustration"
        className="w-64 mb-6"
      /> */}
      <Link
        href="/"
        className="btn bg-orange-500 hover:bg-orange-600 text-white border-none"
      >
        🏠 Back to Home
      </Link>
    </div>
  );
}
