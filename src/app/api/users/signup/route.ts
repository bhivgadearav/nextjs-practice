import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import cors from "cors";
import express from "express";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        console.log(username || "username not found", email || "email not found" , password || "password not found");

        //check if user already exists
        const user = await User.findOne({email})
        .catch((err: any) => {
            console.log(err);
        })

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        .catch((err: any) => {
            console.log(err);
        })
        console.log(savedUser);

        //send verification email
        await sendEmail(email, "VERIFY", savedUser._id)

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}
