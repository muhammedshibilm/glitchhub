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

// POST handler to redeem credit
export async function POST(req) {
  const token = req.cookies.get("authToken")?.value; // Get token from cookies

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 }); // Unauthorized if token is missing
  }

  const phoneNumber = getPhoneNumberFromToken(token); // Get phoneNumber from the token

  if (!phoneNumber) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 }); // Return error if token is invalid
  }

  const { fairAmount } = await req.json(); // Extract fairAmount from the request body
  const fairAmountFloat = parseFloat(fairAmount); // Ensure fairAmount is a float

  if (isNaN(fairAmountFloat) || fairAmountFloat <= 0) {
    return NextResponse.json({ error: "Invalid fair amount" }, { status: 400 });
  }

  try {
    // Find the wallet by phone number
    const wallet = await prisma.wallet.findUnique({ where: { phoneNumber } });

    if (!wallet) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    }

    // Check if the wallet has enough balance to redeem
    if (wallet.balance < fairAmountFloat) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    // Subtract the fairAmount from the wallet balance
    const updatedWallet = await prisma.wallet.update({
      where: { phoneNumber },
      data: {
        balance: {
          decrement: fairAmountFloat, // Decrease the balance by the fair amount
        },
      },
    });

    return NextResponse.json({
      message: "Credit redeemed successfully",
      updatedWallet,
    });
  } catch (error) {
    console.error("Error redeeming credit:", error);
    return NextResponse.json({ error: "Error redeeming credit" }, { status: 500 });
  }
}
