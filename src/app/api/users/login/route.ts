import {connect} from "@/dbconfig/dbconfig"
import bcryptjs from "bcrypt"
import User from '@/models/usermodel'
import {NextRequest,NextResponse} from 'next/server'
import jwt from "jsonwebtoken"
connect();


export async function POST(request:NextRequest) {
 try {
    const reqBody= await request.json();
       const {email,password}=reqBody
       console.log(reqBody);

       const user=await User.findOne({email})
       if(!user){
        return NextResponse.json({message:"User does not exist"},{status:400})
       }
       console.log("user exist");

       const validPassword =  await bcryptjs.compare(password,user.password)
       if(!validPassword){
        return NextResponse.json({message:"Check your providing credentials"},{status:400})
       }

       const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
       }
     const token= await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'})
     

     const response=NextResponse.json({
        message:"Logged in Success",
        success:true
     })
     response.cookies.set("token",token,{
        httpOnly:true
     })
     return response
 } catch (error: unknown) {
   if (error instanceof Error) {
     return NextResponse.json({ error: error.message }, { status: 500 });
   }
   return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
 }
}