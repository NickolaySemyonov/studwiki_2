//#region User-related types
export interface IUser{
    id:string,
    role:string,
    email:string,
    nickname:string
}
export interface ICredentials{
    email:string,
    password:string
}
export interface IRegistrationData extends ICredentials{
    nickname:string,
    password2:string
}
//#endregion

//#region Section-related types
export interface ISectionMeta{
    sectionId:number,
    name:string
}
export interface IArticleMeta{
    articleName:string,
    articleId:number,
    authorNickname:string,
    hidden:boolean,
    lastUpdated:string, 
    sectionId:number,
    authorId:number
}
//#endregion

//#region 
export interface INewArticle{
    sectionId:number,
    authorId:number, 
    name:string,
    quillDelta:string
}

export interface IArticle extends IArticleMeta{
    commenting:boolean,
    lastEditorId:number,
    lastEditorNickname:string,
    quillDelta:string
}
//#endregion
