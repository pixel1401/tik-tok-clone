<template>
    <div :id="`PostMain-${props.post.id}`" class="flex border-b py-6">
        <div @click="$userStore.isLoggedIn(post.user)" class="cursor-pointer">
            <img class="rounded-full max-h-[60px]" width="60" :src="props.post.user.image" />
        </div>
        <div class="pl-3 w-full px-4">
            <div class="flex items-center justify-between pb-0.5">
                <button @click="$userStore.isLoggedIn(post.user)">
                    <span class="font-bold hover:underline cursor-pointer">
                        {{ $generalStore.allLowerCaseNoCaps(props.post.user?.name ?? '') }}
                    </span>
                    <span class="text-[13px] text-light text-gray-500 pl-1 cursor-pointer">
                        {{ props.post.user?.name ?? '' }}
                    </span>
                </button>

                <button
                    @click="isFollow ? unFollow() : followUser(props.post.user.id ?? 0)"
                    class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
                    Follow
                </button>
            </div>
            <div class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{{ props.post.text }}</div>
            <!-- <div class="text-[14px] text-gray-500 pb-0.5">#fun #cool #SuperAwesome</div> -->
            <!-- <div class="text-[14px] pb-0.5 flex items-center font-semibold">
                <Icon name="mdi:music" size="17" />
                <div class="px-1">original sound - AWESOME</div>
                <Icon name="mdi:heart" size="20" />
            </div> -->

            <div class="mt-2.5 flex">
                <div @click="displayPost(post)"
                    class="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer">
                    <video ref="video" loop muted class="rounded-xl object-cover mx-auto h-full" :src="props.post.video" />

                    <img class="absolute right-2 bottom-14" width="90" src="~/assets/images/tiktok-logo-white.png">
                </div>
                <div class="relative mr-[75px]">
                    <div class="absolute bottom-0 pl-2">
                        <div class="pb-4 text-center">
                            <button @click="isLiked ? unlikePost(post) : likePost(post)"
                                class="rounded-full bg-gray-200 p-2 cursor-pointer">

                                <Icon name="mdi:heart" size="25" :color="isLiked == true ? '#F02C56' : ''" />
                            </button>
                            <span class="text-xs text-gray-800 font-semibold">
                                {{ props.post.likes.length }}
                            </span>
                        </div>

                        <div class="pb-4 text-center">
                            <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <Icon name="bx:bxs-message-rounded-dots" size="25" />
                            </div>
                            <span class="text-xs text-gray-800 font-semibold"> {{ props.post.comments.length }}</span>
                        </div>

                        <!-- <div class="text-center">
                            <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <Icon name="ri:share-forward-fill" size="25" />
                            </div>
                            <span class="text-xs text-gray-800 font-semibold">55</span>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'nuxt/dist/app/compat/capi';
import { threadId } from 'worker_threads';
import IPost from '~/models/IPost';
import IUser from '~/models/IUser';

const { $generalStore, $userStore } = useNuxtApp()

const props = defineProps({
    post: {
        type: Object as PropType<IPost>,
        required: true
    }
})


onMounted(() => {
    let observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
            // console.log('Element playing ' + props.post.id);
            video.value?.play();
        } else {
            // console.log('Element paused ' + props.post.id);
            video.value?.pause();
        }
    }, { threshold: [0.6] });

    observer.observe(document.getElementById(`PostMain-${props.post.id}`) as Element);
})

onBeforeUnmount(() => {
    video.value?.pause();
    if (video.value) {
        video.value!.src = '';
    }
})


const router = useRouter()

let video = ref<HTMLVideoElement | null>(null)





const isLiked = computed(() => {
    let res = props.post.likes.find(like => like.user_id == $userStore.id);
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
        $generalStore.unlikePost(like.id);
    }
}



const displayPost = (post: IPost) => {
    if (!$userStore.id) return;

    $generalStore.setBackUrl('/');
    $generalStore.selectedPost = undefined;
    router.push(`/post/${post.id}`);
}


// FOLLOW USER OR UN FOLLOW
const isFollow = computed(() => {
    let res = $userStore?.follows?.find(follow => follow.user_id == $userStore.id);
    return res ? true : false;
})

const followUser = (follow_id : number) => {
    $userStore.followUser(follow_id);
}

const unFollow = () => {
    
    $userStore.deleteFollow(id);
}

</script>