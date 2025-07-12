import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  const admissionCollection = dbConnect(collectionNamesObj.admissionCollection);
  const result = await admissionCollection.insertOne(body);

  return NextResponse.json(result);
};
export const GET = async (req) => {
  const admissionCollection = dbConnect(collectionNamesObj.admissionCollection);
  const result = await admissionCollection.find().toArray();

  return NextResponse.json(result);
};
