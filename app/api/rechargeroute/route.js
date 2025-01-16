import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

// Function to extract the phoneNumber from JWT token
function getPhoneNumberFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decoding JWT token
    return decoded.phoneNumber; // Assuming phoneNumber is in the payload
  } catch (error) {
    console.error("Token verification failed", error);
    return null; // Return null if token verification fails
  }
}

// POST handler to recharge wallet
export async function POST(req) {

  const token = req.cookies.get("authToken")?.value; // Get token from cookies
  
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 }); // Unauthorized if token is missing
  }

  const phoneNumber = getPhoneNumberFromToken(token); // Get phoneNumber from the token

  if (!phoneNumber) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 }); // Return error if token is invalid
  }

  const { amount } = await req.json(); 
  // Ensure amount is a float
  const amountFloat = parseFloat(amount);



  if (isNaN(amountFloat) || amountFloat <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 }); 
  }

  try {
    // Create or update wallet entry
    const wallet = await prisma.wallet.upsert({
      where: { phoneNumber }, // Find wallet by phone number
      update: {
        balance: {
          increment: amountFloat, // Increment the balance by the given amount
        },
      },
      create: {
        phoneNumber, // Create a new wallet with the phone number
        balance: amountFloat, // Set the initial balance to the amount
      },
    });

    return NextResponse.json({ message: "Wallet updated successfully", wallet }); // Successful response
  } catch (error) {
    console.error("Error updating wallet:", error);
    return NextResponse.json({ error: "Error updating wallet" }, { status: 500 }); // Internal server error if something goes wrong
  }
}


export async function GET(req) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const phoneNumber = getPhoneNumberFromToken(token);

  if (!phoneNumber) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  try {
    const wallet = await prisma.wallet.findUnique({ where: { phoneNumber } });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    return NextResponse.json({ balance: wallet.balance });
  } catch (error) {
    console.error("Error fetching wallet:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}