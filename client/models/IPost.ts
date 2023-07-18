import IUser from "./IUser"

export default interface IPost {
    id: number
    text: string
    video: string
    created_at: string
    comments: any[]
    likes: any[]
    user:  Pick<IUser, 'id' | 'name' | 'image'> 
}