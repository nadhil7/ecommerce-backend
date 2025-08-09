
export function middleware(req, res, next) {
    if (!req.session.adminId) {
        return res.status(404).json({ message: "entry restricted!!" })
    }
    next()
}
