import type { Delta } from "quill"

//#region User-related types
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

//#endregion

export interface INewArticle{
    sectionId:number,
    authorId:number, 
    name:string,
    quillDelta:string
}