import type { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'

const jwtSecret: string = process.env.JWT_SECRET as string
const jwtSecretRefresh: string = process.env.JWT_SECRET_REFRESH as string

export const checkJwt(req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers.auth
    let jwtPayload: any;

    try {
        jwtPayload = jwt.verify(token, jwtSecret)
        res.locals.jwtPayload = jwtPayload
    } catch(e) {
        return res.status(401).json({ok: false, message: "Invealid Token"});
    }

    const { userId, email } = jwtPayload;

    const newToken = jwt.sign({userId, email}, jwtSecret, {expiresIn: '1h'})
    res.setHeader('token', newToken)
    next()
}