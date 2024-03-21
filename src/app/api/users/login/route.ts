import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()


export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(email || "email not found" , password || "password not found");

        //check if user already exists
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error: "User doesn't exist"}, {status: 400})
        }

        //compare password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        //create and assign token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}