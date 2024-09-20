import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel"
import { error } from "console";

import { NextRequest, NextResponse } from "next/server";

connect();
export async function POST(request:NextRequest){
    try {
        const reqBody=await request.json()
        const {token}=reqBody
        console.log(token);

      const user= await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
      if(!user){
        return NextResponse.json({error:error.message},{})
      }
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}