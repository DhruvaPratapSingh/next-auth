import  bcryptjs  from 'bcrypt';
import User from "@/models/usermodel";
import nodemailer from "nodemailer"

export const sendEmail=async({email,emailtype,userId}:any)=>{
    try {

      // configure mail 
      const hashedToken = await bcryptjs.hash(userId.toString(),10);

       if(emailtype==='VERIFY'){
        await User.findByIdAndUpdate(userId,
          {verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000})
       }
      //  else if(emailtype==='RESET')
       else{
        await User.findByIdAndUpdate(userId,
          {forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry:Date.now() + 3600000
          }
        )
       }

         const transporter = nodemailer.createTransport({
         host: "sandbox.smtp.mailtrap.io",
         port: 2525,
         auth: {
           user: "49b67f1577280c",
           pass: "3344563272a017"
         }
       });
       
          const mailOption={
            from: "dhruva@.com",
            to: email, 
            subject: emailtype==='VERIFY' ? "verify your email" : "Reset Your password", 
            html:`
            <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here </a> to ${emailtype
              ==="VERIFY"?"verify your mail" : "reset your password"
            }
            or copy and paste the link below in your browser
            <br> ${process.env.DOMAIN}/verifyemail?token=${
              hashedToken
            }
            </p>
            `,
          }
         const mailresponce=await transporter.sendMail(mailOption);
         return mailresponce;
    } catch (error:any){
        throw new Error(error.message);
    }
}