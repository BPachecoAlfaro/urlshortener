import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { UserDto } from '../../domain/dtos/auth/user.dto';
import { CustomError } from "../../domain/errors/custom.error";


export class AuthService {

    constructor() {}

    public async registerUser ( userDto: UserDto ) {
        
        const existUser = await UserModel.findOne({ email: userDto.email })
        if ( existUser ) throw CustomError.badRequest( "Email already exist" );

        try {
            const user = new UserModel( userDto );
            user.password = bcryptAdapter.hash(userDto.password);

            await user.save();

            const token = await JwtAdapter.generateToken({ id: user._id, email: user.email});
            if ( !token ) throw CustomError.internalServer('Error while creating JWT');

            return {
                user: user,
                token: token
            };

        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }

    }

    public async loginUser ( userDto: UserDto ) {

        const user = await UserModel.findOne({ email: userDto.email })
        if (!user) throw CustomError.badRequest('Email or password invalid');

        const isMatching = bcryptAdapter.compare(userDto.password, user.password);
        if (!isMatching) throw CustomError.badRequest('Email or password invalid');
    
        const token = await JwtAdapter.generateToken({ id: user._id, email: user.email});
        if ( !token ) throw CustomError.internalServer('Error while creating JWT');
    
        return {
            user: user,
            token: token
        };


    }

}