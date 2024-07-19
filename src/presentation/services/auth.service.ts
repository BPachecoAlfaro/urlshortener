import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { envs } from "../../config/envs";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data/mongo/models/user.model";
import { UserDto } from '../../domain/dtos/auth/user.dto';
import { CustomError } from "../../domain/errors/custom.error";
import { EmailService } from './email.service';


export class AuthService {

    constructor(
        private readonly emailService: EmailService,
    ) {}

    public async registerUser ( userDto: UserDto ) {
        
        const existUser = await UserModel.findOne({ email: userDto.email })
        if ( existUser ) throw CustomError.badRequest( "Email already exist" );

        try {
            const user = new UserModel( userDto );
            user.password = bcryptAdapter.hash(userDto.password);

            await user.save();

            await this.sendEmailValidationLink( user.email )

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

    private sendEmailValidationLink = async ( email: string ) => {

        const token = await JwtAdapter.generateToken({ email });
        if (!token ) throw CustomError.internalServer('Error generating JWT token');

        const link = `${ envs.WEBSERVICE_URL }/api/auth/validate-email/${ token }`;
        const html = `
            <h1>Validate your email</h1>
            <p>Click on the following link to validate your email</p>
            <a href="${ link }">Validate your email: ${ email }</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendMail(options);
        if ( !isSent ) throw CustomError.internalServer('Error sending email');

        return true;
    }

    public validateEmail = async (token: string ) => {

        const payload = await JwtAdapter.validateToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internalServer('Email not in token');

        const user = await UserModel.findOne({ email });
        if (!user) throw CustomError.internalServer('Email not exists');

        user.isValidated = true;
        await user.save();

        return true;

    }

}