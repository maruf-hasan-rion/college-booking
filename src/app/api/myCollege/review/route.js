import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  const body = await req.json();
  const { email, reviewText, rating } = body;
  const admissionCollection = dbConnect(collectionNamesObj.admissionCollection);

  const data = await admissionCollection.updateOne(
    { email },
    { $set: { review: { text: reviewText, rating: parseInt(rating) } } }
  );

  return NextResponse.json(data);
}
