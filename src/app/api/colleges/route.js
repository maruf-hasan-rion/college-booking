import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const collegeCollection = dbConnect(collectionNamesObj.collegeCollection);
  const result = await collegeCollection.find().toArray();

  return NextResponse.json(result);
};
