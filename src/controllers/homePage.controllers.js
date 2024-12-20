import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { ApiError } from "../utils/errorResponse.js"

const homePage=asyncHandler((req,res,next)=>{
    res.status(200).json(new ApiResponse(200,"ok","sucessfull"))
})

export{homePage}