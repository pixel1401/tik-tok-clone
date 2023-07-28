export default interface IUser {
    id?: number
    name?: string
    bio?: string
    image?: string,
    created_at?: string
    updated_at?: string,
    followers?: IFollow[],
    following?: IFollow[],
}


export interface IFollow {
    id: number
    user_id: number
    follow_id: number
}