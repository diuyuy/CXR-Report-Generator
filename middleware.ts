import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = true;

  if (isLoggedIn && request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/chats";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  mathcer: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
