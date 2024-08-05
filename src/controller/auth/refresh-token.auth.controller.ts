import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { refreshAuthToken } from "../../service/auth.service";


//@desc token refreshh
//@method GEt  /auth/refresh
//@access public
export const refreshTokenHandler = asyncHandler(async (req: Request, res: Response) => {
    const token = await refreshAuthToken(req)
    res.status(200).json({ sccuses: true, date: { ...token } });
})

