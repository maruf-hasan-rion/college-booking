import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const p = await params;
  const admissionCollection = dbConnect(collectionNamesObj.admissionCollection);
  const data = await admissionCollection.findOne({ email: p.email });
  console.log("data", data);

  return NextResponse.json(data);
}
