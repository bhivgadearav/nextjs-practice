import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest) {
    try {
        const data = await getDataFromToken(request)
        const user = await User.findById(data.id).select("-password")
        return NextResponse.json({
            message: "User found",
            success: true,
            data: user,
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}