import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const SALT_ROUND = parseInt(process.env.SALT_ROUND || "10", 10); 

export async function POST(req) {
  try {
    const { name, phoneNumber, password } = await req.json();

    if (!name || !phoneNumber || !password) {
      return NextResponse.json(
        { message: "Missing required values" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, SALT_ROUND);

    const user = await prisma.user.create({
      data: {
        name,
        phoneNumber ,
        password: hashPassword,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Failed to create user", error: error.message },
      { status: 500 }
    );
  }
}
