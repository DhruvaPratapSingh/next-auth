import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getDataFromToken = (request: NextRequest): string | null => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        return decodedToken.id || null;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.error("JWT error:", error.message);
            return null; 
        } else {
            console.error("Error verifying token:", error);
            return null; 
        }
    }
};
