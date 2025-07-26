export function middleware(req,res,next){
    if(!req.session.userId)
    {
        return res.status(404).json({message:"entry restricted!!"})
    }
    next()
    }