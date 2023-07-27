import IPost, { ILikes } from "~/models/IPost";

export function useLike(likes : ILikes[]  ) {

    
    const {$generalStore , $userStore} = useNuxtApp();
    
   
    

    const isLiked = computed(() => {
        let res = likes.find(like => like.user_id == $userStore.id);
        return res ? true : false;
        // return  false;
    })
    

    const hello = watch(likes , () => {
        console.log(likes);
    });

  
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