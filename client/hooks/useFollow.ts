function useFollow(post_user_id: number) {
    const { $userStore } = useNuxtApp();

    const isFollow = computed(() => {
        let res = $userStore?.followers?.find(follow => follow.follow_id == post_user_id);
        return res ? true : false;
    })

    const followUser = (follow_id: number) => {
        $userStore.followUser(follow_id);
    }

    const unFollow = () => {
        const isFollow = $userStore.followers?.find((follow) => follow.follow_id == post_user_id);

        if (!isFollow) return;

        $userStore.deleteFollow(isFollow.id);
    }


    return { isFollow, followUser, unFollow };
};


export default useFollow;