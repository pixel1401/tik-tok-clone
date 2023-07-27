function useFollow (post_user_id : number) {
    const {$userStore} = useNuxtApp();

    const isFollow = computed(() => {
        let res = $userStore?.follows?.find(follow => follow.user_id == $userStore.id);
        return res ? true : false;
    })
    
    const followUser = (follow_id : number) => {
        $userStore.followUser(follow_id);
    }
    
    const unFollow = () => {
        const isFollow = $userStore.follows?.find((follow) => follow.follow_id == post_user_id);
    
        if(!isFollow) return;
    
        $userStore.deleteFollow(isFollow.id);
    }


    return {isFollow , followUser , unFollow};
};


export default useFollow;