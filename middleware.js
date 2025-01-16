import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';  // Importing the jose library

const publicRoutes = ["/login", "/signup"];
const protectedRoutes = ["/", "/map", "/profile", "/recharge", "/sucess", "/wallet","/recharge"];

export async function middleware(req) {
  const token = req.cookies.get("authToken")?.value; // Retrieve token from cookies
  const { pathname } = req.nextUrl;

  // Handle public routes
  if (publicRoutes.includes(pathname)) {
    if (token) {
      try {
        // Verify token using 'jose' library and redirect if valid
        await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
        return NextResponse.redirect(new URL("/", req.url)); // Redirect to home if authenticated
      } catch (error) {
        // Token is invalid or expired, continue to the login page
        console.log("Token verification failed: ", error);
      }
    }
    return NextResponse.next();
  }

  // Handle protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/login", req.url));
    }
    try {
      // Verify token using 'jose' library and allow request if valid
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    } catch (error) {
      // Token is invalid or expired, redirect to login page
      console.log("Token verification failed: ", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next(); // Allow the request to proceed
}

export const config = {
  matcher: [
    "/login/:path*",
    "/signup",
    "/",
    "/map",
    "/wallet",
    "/profile/:path*", 
    "/recharge/:path*"
  ],
};
