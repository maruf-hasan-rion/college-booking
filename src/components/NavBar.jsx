"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  const { data: session, status } = useSession();
  console.log(session);
  const navMenu = () => {
    return (
      <>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/colleges"}>Colleges</Link>
        </li>
        <li>
          <Link href={"/admission"}>Admission</Link>
        </li>{" "}
        <li>
          <Link href={"/myCollege"}>My College</Link>
        </li>
      </>
    );
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navMenu()}
            </ul>
          </div>
          <Link href={"/"} className="text-xl">
            College Booking
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navMenu()}</ul>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 items-center">
            {status == "authenticated" ? (
              <>
                <li className="text-xl font-bold px-4">
                  {/* <Image
                    src={session?.user?.image || null}
                    width={64}
                    height={64}
                    className="rounded-full"
                    alt="user-logo"
                  /> */}
                  <Link href={"/profile"}>{session?.user?.name}</Link>
                </li>
                <li className="btn" onClick={() => signOut()}>
                  Log Out
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href={"/register"}>Register</Link>
                </li>
                <li>
                  <Link href={"/login"}>Login</Link>
                </li>
              </>
            )}
          </ul>
          {/* <a className="btn btn-outline">Appointment</a> */}
        </div>
      </div>
    </div>
  );
}
