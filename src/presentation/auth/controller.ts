import { Request, Response } from "express";
import { UserModel } from "../../data/mongo/models/user.model";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserDto } from '../../domain/dtos/auth/user.dto';
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain/errors/custom.error";


export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ){}

    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        console.log(`${ error }`);
        return res.status(500).json({ error: 'Internal server error' })
    } 

    public registerUser = (req: Request, res: Response) => {

        const [ error, userDto ] = UserDto.create( req.body);
        if ( error ) return res.status(400).json({error})

        this.authService.registerUser(userDto!)
            .then( (user) => res.json(user) )
            .catch ( (error) => this.handleError( error, res))

    }

    public loginUser = (req: Request, res: Response ) => {

        const [ error, userDto ] = UserDto.create( req.body );
        if ( error ) return res.status(400).json({error})
        
        this.authService.loginUser(userDto!)
            .then( (user) => res.json(user) )
            .catch ( (error) => this.handleError( error, res))

    }

    public validateEmail = (req: Request, res: Response ) => {
        
        res.json('validateEmail')

    }

}