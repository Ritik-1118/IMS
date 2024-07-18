export const adminMiddleware = (req, res, next) => {
    const isAdmin = req.cookies.isAdmin;
    // console.log(isAdmin)

    if (!isAdmin) {
        return res.status(401).json({ message: "Admin status not found in cookies" });
    }

    if (isAdmin !== 'true') {
        return res.status(403).json({ message: "Not authorized" });
    }

    next();
};