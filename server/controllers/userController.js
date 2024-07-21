import User from "../models/User.js";

export const register = async ( req, res ) => {
    try {
        const { username, email, password } = req.body;
        const UserExist = await User.findOne( { username } );
        if ( UserExist ) {
            return res.status( 400 ).json( { msg: "Username Already exist" } );
        }
        const Usercreated = await User.create( {
            username,
            email,
            password,
            isAdmin:req.body?.isAdmin
        } );
        console.log(Usercreated)
        res.status( 201 ).json( {
            message: "Registration Succesfully",
            userId: Usercreated._id.toString(),
            username: Usercreated.username,
            token: await Usercreated.generateToken(),
        } );
    } catch ( error ) {
        console.log( error );
    }
};

export const login = async ( req, res ) => {
    try {
        const {username, password } = req.body;
        const UserExist = await User.findOne( { username } );
        if ( !UserExist ) {
            return res.status( 400 ).json( { message: "Invalid credantials" } );
        }
        // console.log("userExisted:- ",UserExist)
        const validpswd = await UserExist.Comparepswd( password );
        // console.log("validpswd:-",validpswd)
        const accessToken = await UserExist.generateToken();
        // console.log("accessToken:-",accessToken)
        const isAdmin = UserExist.isAdmin;
        if ( validpswd ) {
            res.cookie('isAdmin', isAdmin, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            res.cookie('user', UserExist, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            res
                .status( 201 )
                .cookie('access_token', accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // Ensure the cookie is only sent over HTTPS in production
                    sameSite: 'strict', 
                    maxAge: 24 * 60 * 60 * 1000
                })
                
                .json({
                    message: "Login Succesful",
                    userId: UserExist._id.toString(),
                    username:UserExist.username,
                    email:UserExist.email,
                    token: accessToken,
                    isAdmin:UserExist.isAdmin
                });
        } else {
            res.status( 401 ).json( { message: "Invalid username or Password" } );
        }
    } catch ( error ) {
        res.status( 500 ).json(error);
    }
};

export const getCurrentUser = async (req,res) => {
    try{
        const userdata = req.user;
        return res.status(200).json(userdata);
    } catch (error) {
        console.log(error);
    }
}

export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId, '-password'); // Exclude the password field from the result

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords from the response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};