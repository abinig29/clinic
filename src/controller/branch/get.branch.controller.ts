import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getBranches } from '../../service/branch.service';



//@desc get all branches
//@method GET  /brnach
//@access private
const getBranchesHandler = asyncHandler(async (req: Request, res: Response) => {
    const branches = await getBranches()
    res.status(200).json({
        success: true,
        data: branches,
    })
})

export { getBranchesHandler };
