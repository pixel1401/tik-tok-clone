import IPost from "./IPost";
import IUser from "./IUser";

export default interface IGeneral {
    isLoginOpen : boolean,
    isEditProfileOpen : boolean,
    selectedPost : IPost | null,
    ids? : number[],
    isBackUrl : string,
    posts?: IPost[],
    suggested? : IUser[] ,
    following? : IUser[] 
}