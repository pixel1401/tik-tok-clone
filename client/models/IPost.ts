import IUser from "./IUser"

export default interface IPost {
    id: number
    text: string
    video: string
    created_at: string
    comments: IComment[]
    likes: ILikes[]
    user:  Pick<IUser, 'id' | 'name' | 'image'> 
}

export interface ILikes {
    id: number ,
    user_id : number,
    post_id : number,
}

interface IComment {
    id: number ,
    text : string,
    user : {
        id : number,
        name : string ,
        image : string
    },
}