export interface IUser{
    id: string,
    role:string,
    email:string,
    nickname:string
}

export interface ICredentials{
    email: string,
    password: string
}

export interface IRegistrationData extends ICredentials{
    nickname:string,
    password2:string
}