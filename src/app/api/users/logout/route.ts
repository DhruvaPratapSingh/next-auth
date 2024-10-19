import {connect} from "@/dbconfig/dbconfig"
import {NextResponse} from 'next/server'
connect();

export async function GET() {
    try {
     const responce=NextResponse.json({
        message:"Logout successfully",
        success:true
     })
     responce.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0)
     })
     return responce;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
   }