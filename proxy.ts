import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { atob } from "node:buffer";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const individualNCompanyRoutes = ["/user-dashboard", "/apply-noc", "/non-individual-upload-document"];
  const adminRoutes = ["/authority-dashboard"];

  const encData = req.cookies.get("enData")?.value;

  // ❌ No session
  if (!encData) {
    return NextResponse.redirect(new URL("/session-expired", req.url));
  }

  let userData: any;

  try {
    userData = JSON.parse(atob(encData));
  } catch (err) {
    return NextResponse.redirect(new URL("/session-expired", req.url));
  }

  const isIndividualOrCompany =
    (userData?.user_type_id == "5" || userData?.user_type_id == "9") &&
    individualNCompanyRoutes.some(route => pathname.startsWith(route));

  const isAdmin =
    (userData?.user_type_id == "10") &&
    adminRoutes.some(route => pathname.startsWith(route));

  if (isIndividualOrCompany || isAdmin) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/un-authorized", req.url));
}

export const config = {
  matcher: [
    "/user-dashboard/:path*",
    "/apply-noc/:path*",
    "/authority-dashboard/:path*",
  ],
};
