import jwt from "jsonwebtoken";
import User from "../models/User.js";
const authMiddleware = async ( req, res, next ) => {
    const token = req.header( "Authorization" ) || req.cookies.access_token;
    if ( !token ) {
        return res
            .status( 401 )
            .json( { message: "Unauthorized HTTp ,Token not found" } );
    }
    const jwtToken = token.replace( "Bearer", "" ).trim();
    try {
        const isverified = jwt.verify( jwtToken, process.env.JWT_SECRET_KEY );
        const userdata = await User.findOne( { username: isverified.username } ).select( {
            password: 0,
        } );
        req.user = userdata;
        req.token = token;
        req.userId = userdata._id;
        req.isAdmin = userdata.isAdmin;

        next();
    } catch ( error ) {
        return res.status( 401 ).json( { message: "Unauthorized.Invalid token" } );
    }
};

export default authMiddleware;
