import { Request, Response } from "express";
import { UserModel } from "../../data/mongo/models/user.model";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";


export class AuthController {

    public registerUser = async (req: Request, res: Response) => {

        const { email, password } = req.body;
        
        const existUser = await UserModel.findOne({ email: email })
        if ( existUser ) return;

        try {
            const user = new UserModel({email: email});
            user.password = bcryptAdapter.hash(password);

            await user.save();

            const token = await JwtAdapter.generateToken({ id: user._id, email: email});
            if ( !token ) return res.json('Error while creating JWT');

            return res.json({
                user: user,
                token: token
            });

        } catch (error) {
            throw new Error('Error base de datos');
        }

    }

    public loginUser = async (req: Request, res: Response ) => {

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email })
        if (!user) return;

        const isMatching = bcryptAdapter.compare(password, user.password)
        if ( !isMatching ) res.json("Email o contraseña incorrecta");

        const token = await JwtAdapter.generateToken({ id: user._id, email: email});
        if ( !token ) return res.json('Error while creating JWT');

        res.json({
            user: user,
            token: token,
        });

    }

    public validateEmail = (req: Request, res: Response ) => {
        
        res.json('validateEmail')

    }

}