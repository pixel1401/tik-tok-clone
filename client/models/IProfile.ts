import IUser from "./IUser";

export default interface IProfile extends IUser {
    post? : [],
    posts? : [],
    allLikes: number
}