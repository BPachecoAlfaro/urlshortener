import { regularExps } from "../../../config/regular-exp";


export class UserDto {

    constructor(
        public email: string,
        public password: string,
    ) {}

    static create( object: { [key: string]: any } ):[ string?, UserDto? ] {

        const { email, password } = object;

        if ( !email ) return ['Missing email'];
        if ( !regularExps.email.test( email ) ) return ["Email is not valid"];
        if ( !password ) return ["Missing password"];
        if ( password.length < 6 ) return ["Password too short"];


        return [ undefined, new UserDto( email, password ) ];

    }

}