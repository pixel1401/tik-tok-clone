import IPost, { ILikes } from "~/models/IPost";

export function useLike(likes : globalThis.Ref<ILikes[]>  ) {

    const {$generalStore , $userStore} = useNuxtApp();


    const likesRef = toRef(likes); 


    const isLiked = computed(() => {
        let res = likes.value.find(like => like.user_id == $userStore.id); 
        return res ? true : false;
    })
     
    const likePost = async (post: IPost) => {
        if (!$userStore.id) return;
    
        $generalStore.likePost(post.id);
    
    }
    
    const unlikePost = async (post: IPost) => {
        if (!$userStore.id) return;
    
        let like = post.likes.find((like) => like.user_id == $userStore.id);

        
        if (like) {
            $generalStore.unlikePost(like.id , post.id);
        }
    }


    onMounted(() => {
    })


    return {isLiked , likePost , unlikePost };
    
}