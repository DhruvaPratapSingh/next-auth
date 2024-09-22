import {connect} from "@/dbconfig/dbconfig"
import User from '@/models/usermodel'
import {NextRequest,NextResponse} from 'next/server'
import { getDataFromtoken } from "@/helper/getDataFromtoken"
connect();


export async function POST(request:NextRequest) {
 const userId=getDataFromtoken(request)
 const user = await User.findOne({_id:userId})
 .select("-password")
 return NextResponse.json({
    message:"User found",
    data:user
 })
}