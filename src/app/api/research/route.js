import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  const researchCollection = dbConnect(collectionNamesObj.researchCollection);
  const result = await researchCollection.find().toArray();

  return NextResponse.json(result);
}
