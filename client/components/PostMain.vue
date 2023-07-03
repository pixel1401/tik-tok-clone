<template>
    <div :id="`PostMain-5`" class="flex border-b py-6">
        <div @click="isLoggedIn(post.user)" class="cursor-pointer">
            <img class="rounded-full max-h-[60px]" width="60" 
            
            src="https://picsum.photos/200">
        </div>
        <div class="pl-3 w-full px-4">
            <div class="flex items-center justify-between pb-0.5">
                <button >
                    <span class="font-bold hover:underline cursor-pointer">
                        <!-- {{ $generalStore.allLowerCaseNoCaps(post.user.name) }} -->
                        Erzhan
                    </span>
                    <span class="text-[13px] text-light text-gray-500 pl-1 cursor-pointer">
                        <!-- {{ post.user.name }} -->
                        Siman
                    </span>
                </button>

                <button
                    class="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
                    Follow
                </button>
            </div>
            <div class="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">Teztx</div>
            <div class="text-[14px] text-gray-500 pb-0.5">#fun #cool #SuperAwesome</div>
            <div class="text-[14px] pb-0.5 flex items-center font-semibold">
                <Icon name="mdi:music" size="17" />
                <div class="px-1">original sound - AWESOME</div>
                <Icon name="mdi:heart" size="20" />
            </div>

            <div class="mt-2.5 flex">
                <div @click="displayPost(post)"
                    class="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer">
                    <video  ref="video" loop muted class="rounded-xl object-cover mx-auto h-full"
                        src="https://www.shutterstock.com/shutterstock/videos/1029569669/preview/stock-footage-dnipro-ukraine-may-people-play-bumperball-zorbsoccer-outdoor-party-time-may-in.webm" />
                    <img class="absolute right-2 bottom-14" width="90" src="~/assets/images/tiktok-logo-white.png">
                </div>
                <div class="relative mr-[75px]">
                    <div class="absolute bottom-0 pl-2">
                        <div class="pb-4 text-center">
                            <button @click="isLiked ? unlikePost(post) : likePost(post)"
                                class="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <Icon name="mdi:heart" size="25" color=" '#F02C56' " />
                            </button>
                            <span class="text-xs text-gray-800 font-semibold">
                                5
                            </span>
                        </div>

                        <div class="pb-4 text-center">
                            <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <Icon name="bx:bxs-message-rounded-dots" size="25" />
                            </div>
                            <span class="text-xs text-gray-800 font-semibold">43</span>
                        </div>

                        <div class="text-center">
                            <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                                <Icon name="ri:share-forward-fill" size="25" />
                            </div>
                            <span class="text-xs text-gray-800 font-semibold">55</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// const { $generalStore, $userStore } = useNuxtApp()
// const props = defineProps(['post'])
// const { post } = toRefs(props)

const router = useRouter()

let video = ref(null)





const isLiked = computed(() => {
   
})

const likePost = async (post) => {
 
}

const unlikePost = async (post) => {

}

const isLoggedIn = (user) => {

}

const displayPost = (post) => {
    

}
</script>