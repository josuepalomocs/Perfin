import { NextRequest, NextResponse } from "next/server";

const middleware = (req: NextRequest) => {
  if (req.headers.has("authorization")) {
    const requestHeaders = new Headers(req.headers);
    const authorizationHeader = requestHeaders.get("authorization");
    const sanitizedAuthorizationHeader = authorizationHeader!.replace("Bearer ", "");
    requestHeaders.set("authorization", sanitizedAuthorizationHeader);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }
};

export default middleware;
