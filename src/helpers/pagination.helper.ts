import { Request } from "express";

const pagination = (req: Request) => {
    const page = parseInt(req.query.page as string) || 1;
    const take = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * take;

    return { take, skip }
}


export default pagination;