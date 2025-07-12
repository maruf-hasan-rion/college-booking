import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const p = await params;
  const admissionCollection = dbConnect(collectionNamesObj.admissionCollection);
  const data = await admissionCollection.findOne({ email: p.email });

  return NextResponse.json(data);
}

export async function PUT(req, { params }) {
  const p = await params;
  const admissionCollection = dbConnect(collectionNamesObj.admissionCollection);
  const body = await req.json();
  const data = await admissionCollection.updateOne(
    { email: p.email },
    {
      $set: {
        name: body.name,
        university: body.collegeId,
        address: body.address,
      },
    }
  );

  return NextResponse.json(data);
}
