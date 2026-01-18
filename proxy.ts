import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { atob } from "node:buffer";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("authToken");
  const role_enc = (typeof(req.cookies.get("role")) == "string" && typeof(req.cookies.get("role")) == "undefined") ? req.cookies.get("role") : "TkE=";

  if (!token) {
    return NextResponse.redirect(new URL("/individual-sign-in", req.url));
  } else if (role_enc) {
    // const role = atob(role_enc);
  }

  // if (role !== "admin") {
  //   return NextResponse.redirect(new URL("/unauthorized", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/apply-noc/:path*"],
};
