import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
    {
        username: {type: String,required: true, unique : true},
        email: {type: String,},
        password: {type: String,required: true,},
        isAdmin: {type: Boolean,default: false,},
    },
    { timestamps: true }
);

userSchema.pre( "save", async function ( next ) {
    const user = this;
    if ( !user.isModified( "password" ) ) {
        next();
    }
    try {
        const salt = await bcrypt.genSalt( 10 );
        const hashpswd = await bcrypt.hash( user.password, salt );
        user.password = hashpswd;
    } catch ( error ) {
        next( error );
    }
} );

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                username:this.username,
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch ( error ) {
        console.log( error );
    }
};
userSchema.methods.Comparepswd = async function ( password ) {
    return await bcrypt.compare( password, this.password );
};

const User = new mongoose.model( "User", userSchema );
export default User;
