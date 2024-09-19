
import {connect} from "@/dbconfig/dbconfig"
import bcryptjs from "bcrypt"
import User from '@/models/usermodel'
import {NextRequest,NextResponse} from 'next/server'
import { sendEmail } from "@/helper/mailer";
connect();

export async function POST(request:NextRequest) {
    try {
       const reqBody= await request.json();
       const {username,email,password}=reqBody
       console.log(reqBody);
       const user=await User.findOne({email})
       if(user){
        return NextResponse.json({error:"User already exists"},{status:400});
       }
       const saltRounds=10
       const salt = await bcryptjs.genSalt(saltRounds);
       const hashedPassword = await bcryptjs.hash(password,salt)
      const newUser= new User({
        username,
        email,
        password:hashedPassword
       })

       const savedUser=await newUser.save()
       console.log(savedUser);

    //  send verifiaction mail
    await sendEmail({email, emailtype:"VERIFY", userId:savedUser._id})
    return NextResponse.json({message:"User register successfully",
        success:true,
        savedUser
    })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}
