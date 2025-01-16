import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { phoneNumber, password } = await req.json();

    // Validate request data
    if (!phoneNumber || !password) {
      return NextResponse.json(
        { error: "Missing required values" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid phone number or password" },
        { status: 401 }
      );
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid phone number or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined.");
      return NextResponse.json(
        { error: "Server configuration issue" },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );

    // Create response and set cookie
    const response = NextResponse.json({ message: "Logged in successfully" });

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600, // 1 hour
    });

    return response;
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const token = req.cookies.get("authToken");

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "Authorized" });
  } catch (error) {
    console.error("Error in auth check route:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
