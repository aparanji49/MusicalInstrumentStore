import { NextFunction, Request, Response } from "express";
import crypto from "crypto";

export function attachCartIdentity(req:Request,res: Response,next: NextFunction){

    const userId = (req as any).user?.id;
    const COOKIE = "guestId";
    let guestId = req.cookies?.[COOKIE];

    if(!userId && !guestId){
        guestId = crypto.randomUUID();
        res.cookie(COOKIE, guestId, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });
    }

    (req as any).cartIdentity = {userId, guestId};
    next();
}