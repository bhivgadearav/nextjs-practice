import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";
        if (!token) {
            throw new Error("No token found");
        }
        const data:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }
}