import IPost from "./IPost";
import IUser from "./IUser";

export default interface IProfile extends IUser {
    post? : [],
    posts? : Array<IPost>,
    allLikes: number
}