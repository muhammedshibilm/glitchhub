import jwt from "jsonwebtoken";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req) {
  try {
    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, phoneNumber } = decoded ;

    return NextResponse.json({ name, phoneNumber });

  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
