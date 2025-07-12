import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import Link from "next/link";
import React from "react";

export default async function CollegesSection() {
  const collegeCollection = dbConnect(collectionNamesObj.collegeCollection);
  const data = await collegeCollection.find({}).toArray();

  return (
    <div>
      <div className="grid grid-cols-12 gap-4 container mx-auto">
        {data.map((item) => {
          return (
            <div
              className="col-span-12 md:col-span-6 lg:col-span-4 p-4 h-full border"
              key={item._id}
            >
              {/* <figure className="w-full h-3/4 flex justify-center items-center">
              <Image
                className="w-full h-full object-fit"
                src={item.img}
                width={314}
                height={108}
                alt={item.title}
              />
            </figure> */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h2 className="font-bold text-xl">{item.name}</h2>
                  {/* <p className="font-bold text-xl text-orange-500">
                  Price : ${item.price}
                </p> */}
                </div>
                <div>
                  <Link
                    href={`/colleges/${item._id}`}
                    className="text-orange-500"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{data[0].name}</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
