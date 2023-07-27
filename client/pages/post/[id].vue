<template>
    <div id="PostPage"
        class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto">
        <div class="lg:w-[calc(100%-540px)] h-full relative">
            <NuxtLink :to="$generalStore.isBackUrl"
                class="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                <Icon name="material-symbols:close" color="#FFFFFF" size="27" />
            </NuxtLink>
            <div v-if="(ids?.length ?? 0) > 1">
                <button @click="loopThroughPostsUp"
                    class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                    <Icon name="mdi:chevron-up" size="30" color="#FFFFFF" />
                </button>
                <button @click="loopThroughPostsDown"
                    class="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                    <Icon name="mdi:chevron-down" size="30" color="#FFFFFF" />
                </button>
            </div>

            <!-- SOUND VIDEO -->



            <img class="absolute top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto" width="45"
                src="~/assets/images/tiktok-logo-small.png">
            <!-- THUMBLAIN  -->
            <video v-if="selectedPost?.video" class="absolute object-cover w-full my-auto z-[-1] h-screen"
                :src="selectedPost?.video" />

            <div v-if="!isLoaded" class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]">
                <Icon class="animate-spin ml-1" name="mingcute:loading-line" size="100" color="#FFFFFF" />
            </div>

            <div class="flex items-center content-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]">
                <div class="h-fit relative m-auto">
                    <video @click="togglePlayOrPause" preload="none" ref="video" loop muted class="cursor-pointer mx-auto" />
                    <div v-if="video?.src != ''" @click="changeMutedVideo"
                        class="cursor-pointer absolute bottom-5 right-3 rounded-full">
                        <Icon v-if="isVideoMuted" name="heroicons-solid:volume-off" size="20" color="#fff" />
                        <Icon v-else name="heroicons-solid:volume-up" size="20" color="#fff" />
                    </div>

                    <div @click="togglePlayOrPause" v-if="isShowPlayOrPauseIconAnimation"
                        class="absolute cursor-pointer top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  m-auto">
                        <Icon v-if="isPauseVideo" name="material-symbols:play-arrow-rounded" size="100" color="#fff" />
                        <Icon v-else name="material-symbols:pause" size="100" color="#fff" />
                    </div>
                </div>
            </div>
        </div>


        <!-- ! INFO SECTION -->
        <div class="lg:max-w-[550px] relative w-full h-full bg-white">
            <div class="py-7" />
            <div class="flex items-center justify-between px-8">
                <div class="flex items-center">
                    <NuxtLink href="/">
                        <img class="rounded-full lg:mx-0 mx-auto" width="40" :src="selectedPost?.user.image" />
                    </NuxtLink>
                    <div class="ml-3 pt-0.5">
                        <div class="text-[17px] font-semibold">
                            {{ $generalStore.allLowerCaseNoCaps(selectedPost?.user.name ?? '') }}
                        </div>
                        <div class="text-[13px] -mt-5 font-light">
                            {{ selectedPost?.user.name }}
                            <span class="relative -top-[2px] text-[30px] pr-0.5 ">.</span>
                            <span class="font-medium">12.02.2022</span>
                        </div>
                    </div>
                </div>
                <Icon @click="deletePost" v-if="isOwnerPost" class="cursor-pointer" name="material-symbols:delete-outline-sharp" size="25" />
            </div>

            <!-- TEXT POST SOUND -->
            <div class="px-8 mt-4 text-sm">{{ selectedPost?.text }}</div>

            <div class="px-8 mt-4 text-sm font-bold">
                <Icon name="mdi:music" size="17" />
                original sound - TT
            </div>

            <!-- ! LIKES AND COMMENTS COUNT -->
            <div class="flex items-center px-8 mt-8">
                <div class="pb-4 text-center flex items-center">
                    <button
                    @click="isLiked ? unlikePost(selectedPost as IPost) : likePost(selectedPost as IPost)"
                    class="rounded-full bg-gray-200 p-2 cursor-pointer">
                        <Icon name="mdi:heart" size="25" :color="isLiked ? '#F02C56' : ''" />
                    </button>
                    <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
                        {{ selectedPost?.likes.length }}
                    </span>
                </div>

                <div class="pb-4 text-center flex items-center">
                    <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                        <Icon name="bx:bxs-message-rounded-dots" size="25" />
                    </div>
                    <span class="text-xs pl-2 text-gray-800 font-semibold">{{ selectedPost?.comments.length }}</span>
                </div>
            </div>

            <!-- ! COMMENTS  -->
            <div id="Comments" class="bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto">

                <div class="pt-2" />

                <div v-if="(selectedPost?.comments.length ?? 0) == 0" class="text-center mt-6 text-xl text-gray-500">
                    No comments...
                </div>
                <div v-else>
                    <div v-for="comment in selectedPost?.comments" class="flex items-center justify-between px-8 mt-4">
                        <div class="flex items-center relative w-full">
                            <NuxtLink :to="`/profile/${comment.user.id}`">
                                <img class="absolute top-0 rounded-full lg:mx-0 mx-auto" width="40"
                                    :src="comment.user.image">
                            </NuxtLink>
                            <div class="ml-14 pt-0.5 w-full">
                                <div class="text-[18px] font-semibold flex items-center justify-between">
                                    {{comment.user.name}}
                                    <Icon
                                     v-if="comment.user.id == $userStore.id"
                                     @click="deleteComment(comment.id)"
                                     class="cursor-pointer"
                                        name="material-symbols:delete-outline-sharp" size="25" />
                                </div>
                                <div class="text-[15px] font-light">
                                    {{comment.text}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-28" />

            </div>


            <!-- ! CRETE COMMENT -->
            <div id="CreateComment" v-if="true"
                class="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2">
                <div :class="true ? 'border-2 border-gray-400' : 'border-2 border-[#F1F1F2]'"
                    class="bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]">
                    <input v-model="comment" @focus="true" @blur="true"
                        class="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg"
                        type="text" placeholder="Add comment...">
                </div>
                <button
                    @click="fetchComment"
                :class="true ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400'"
                    class="font-semibold text-sm ml-5 pr-1">
                    Post
                </button>
            </div>


        </div>
    </div>
</template>

<script lang="ts" setup >
import { storeToRefs } from 'pinia';
import {
    onBeforeMount,
    onMounted,
    ref,
    watch,
} from 'vue';
import { useLike } from '~/hooks/useLike';
import IPost, { ILikes } from '~/models/IPost';

let video = ref<HTMLVideoElement | null>(null);
let isLoaded = ref(false);
let comment = ref<string >('');
let inputFocused = ref(null);
let currentPostID = ref<number>(0);
let isOwnerPost = ref<boolean>(false);
let isVideoMuted = ref<boolean>(video?.value?.muted ?? false);
let isPauseVideo = ref<boolean>(video?.value?.paused ?? false);
let isShowPlayOrPauseIconAnimation = ref<boolean>(false);

let arrtest = ref<ILikes[]>([])

const { $generalStore, $userStore } = useNuxtApp();
const { selectedPost, ids } = storeToRefs($generalStore);


const router = useRouter();
const route = useRoute();




const {isLiked , unlikePost , likePost } = useLike(selectedPost?.value?.likes ?? []);



onMounted(async () => {
    $generalStore.selectedPost = undefined;
    let postId = route.params.id;
    if (typeof postId === 'string') {
        currentPostID.value = +postId;
        try {
            await $generalStore.getPost(postId);
            console.log(selectedPost?.value?.user.id, $userStore.id);

            isOwnerPost.value = selectedPost?.value?.user.id == $userStore.id;
            // setLikeArray(selectedPost?.value?.likes ?? []);

        } catch (error) {
            router.push('/');
        }
        setTimeout(() => {
            if (video.value) {
                video.value.src = selectedPost?.value?.video ?? '';
                isLoaded.value = true
            }
        }, 500)

    }
});

onBeforeMount(() => {
    if (video.value) {
        video.value.pause();
        video.value.currentTime = 0;
        video.value.src = '';
    }
});

watch(() => isLoaded.value, () => {
    if (isLoaded.value) {
        setTimeout(() => {
            video.value?.play()
        }, 500)
    }
})

const loopThroughPostsDown = () => {
    if (ids?.value == undefined || ids.value.length == 0) return;
    let findIndexId = ids.value.indexOf(currentPostID.value);
    if (findIndexId == -1 || findIndexId == (ids.value.length - 1)) return;

    router.push(`/post/${ids.value[++findIndexId]}`);
}

const loopThroughPostsUp = () => {
    if (ids?.value == undefined || ids.value.length == 0) return;
    let findIndexId = ids.value.indexOf(currentPostID.value);
    if (findIndexId == -1 || findIndexId == 0) return;

    router.push(`/post/${ids.value[--findIndexId]}`);
}


const changeMutedVideo = () => {
    if (video.value == null) return;
    video.value.muted = !video.value.muted;
    isVideoMuted.value = video.value.muted;
}

const togglePlayOrPause = () => {
    if (video?.value?.paused) {
        video.value?.play();
        setTimeout(() => {
            isShowPlayOrPauseIconAnimation.value = false;
        }, 500)
    } else {
        video.value?.pause();
    }
    isPauseVideo.value = video?.value?.paused ?? false;
    isShowPlayOrPauseIconAnimation.value = true;
}


const fetchComment = () => {
    if(selectedPost?.value?.id == null || comment.value == '') return;
    $generalStore.fetchComment(selectedPost.value.id ?? -1 , comment.value);
}

const deleteComment = (id : number) => {
    $generalStore.deleteComment(id);
}

const deletePost = async () => {
    if(!selectedPost?.value?.id) return;
    try {
        await $generalStore.deletePost(selectedPost?.value?.id);
        router.push('/');
    } catch (error) {
        
    }
}

// const isLiked = computed(() => {
//     let res = selectedPost?.value?.likes.find(like => like.user_id == $userStore.id);
//     return res ? true : false;
// })

// const likePost = () => {
    
//     if(!selectedPost?.value?.id) return;
    
//     $generalStore.likePost(selectedPost?.value?.id);
// }

// const unLikePost = () => {
//     if(!selectedPost?.value?.id) return;
//     let like = selectedPost.value.likes.find((like) => like.user_id == $userStore.id);
//     $generalStore.unlikePost(like?.id ?? -1 , selectedPost.value.id);
// }

</script>