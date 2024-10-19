import {connect} from "@/dbconfig/dbconfig"
import User from '@/models/usermodel'
import {NextRequest,NextResponse} from 'next/server'
import { getDataFromToken } from "@/helper/getDataFromtoken"
connect();


export async function GET(request:NextRequest) {
 const userId=getDataFromToken(request)
 const user = await User.findOne({_id:userId})
 .select("-password")
 return NextResponse.json({
    message:"User found",
    data:user
 })
}