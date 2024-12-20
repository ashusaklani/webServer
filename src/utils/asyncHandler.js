const asyncHandler=(mainFunction)=>{
    return (req,res,next)=>{
        Promise.resolve(mainFunction(req,res,next))
        .catch(err=>next(err));
    }
}
export {asyncHandler};