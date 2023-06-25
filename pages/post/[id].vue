<template>
    <div id="PostPage"
        class="fixed lg:flex justify-between z-50 top-0 left-0 w-full h-full bg-black lg:overflow-hidden overflow-auto">
        <div class="lg:w-[calc(100%-540px)] h-full relative">
            <NuxtLink class="absolute z-20 m-5 rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                <Icon name="material-symbols:close" color="#FFFFFF" size="27" />
            </NuxtLink>

            <div v-if="true">
                <button
                    class="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                    <Icon name="mdi:chevron-up" size="30" color="#FFFFFF" />
                </button>
                <button
                    class="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-700 p-1.5 hover:bg-gray-800">
                    <Icon name="mdi:chevron-down" size="30" color="#FFFFFF" />
                </button>
            </div>

            <img class="absolute top-[18px] left-[70px] rounded-full lg:mx-0 mx-auto" width="45"
                src="~/assets/images/tiktok-logo-small.png">
            <video v-if="true" class="absolute object-cover w-full my-auto z-[-1] h-screen"
                src="https://www.shutterstock.com/shutterstock/videos/1029569669/preview/stock-footage-dnipro-ukraine-may-people-play-bumperball-zorbsoccer-outdoor-party-time-may-in.webm" />

            <div v-if="!isLoaded" class="flex items-center justify-center bg-black bg-opacity-70 h-screen lg:min-w-[480px]">
                <Icon class="animate-spin ml-1" name="mingcute:loading-line" size="100" color="#FFFFFF" />
            </div>

            <div class="bg-black bg-opacity-70 lg:min-w-[480px]">
                <video v-if="true" ref="video" loop muted class="h-screen mx-auto"
                    src="https://www.shutterstock.com/shutterstock/videos/1029569669/preview/stock-footage-dnipro-ukraine-may-people-play-bumperball-zorbsoccer-outdoor-party-time-may-in.webm" />
            </div>
        </div>


        <!-- ! INFO SECTION -->
        <div class="lg:max-w-[550px] relative w-full h-full bg-white">
            <div class="py-7" />
            <div class="flex items-center justify-between px-8">
                <div class="flex items-center">
                    <NuxtLink href="/">
                        <img class="rounded-full lg:mx-0 mx-auto" width="40" src="https://picsum.photos/id/8/300/320" />
                    </NuxtLink>
                    <div class="ml-3 pt-0.5">
                        <div class="text-[17px] font-semibold">
                            User Name
                        </div>
                        <div class="text-[13px] -mt-5 font-light">
                            User Name
                            <span class="relative -top-[2px] text-[30px] pr-0.5 ">.</span>
                            <span class="font-medium">12.02.2022</span>
                        </div>
                    </div>
                </div>
                <Icon v-if="true" class="cursor-pointer" name="material-symbols:delete-outline-sharp" size="25" />
            </div>

            <!-- TEXT POST SOUND -->
            <div class="px-8 mt-4 text-sm">Post Text</div>

            <div class="px-8 mt-4 text-sm font-bold">
                <Icon name="mdi:music" size="17" />
                original sound - TT
            </div>

            <!-- ! LIKES AND COMMENTS COUNT -->
            <div class="flex items-center px-8 mt-8">
                <div class="pb-4 text-center flex items-center">
                    <button class="rounded-full bg-gray-200 p-2 cursor-pointer">
                        <Icon name="mdi:heart" size="25" :color="true ? '#F02C56' : ''" />
                    </button>
                    <span class="text-xs pl-2 pr-4 text-gray-800 font-semibold">
                        15
                    </span>
                </div>

                <div class="pb-4 text-center flex items-center">
                    <div class="rounded-full bg-gray-200 p-2 cursor-pointer">
                        <Icon name="bx:bxs-message-rounded-dots" size="25" />
                    </div>
                    <span class="text-xs pl-2 text-gray-800 font-semibold">43</span>
                </div>
            </div>

            <!-- ! COMMENTS  -->
            <div 
                id="Comments" 
                class="bg-[#F8F8F8] z-0 w-full h-[calc(100%-273px)] border-t-2 overflow-auto"
            >
                
                <div class="pt-2"/>

                <div 
                    v-if="false" 
                    class="text-center mt-6 text-xl text-gray-500"
                >
                    No comments...
                </div>

                <div 
                    v-else
                    class="flex items-center justify-between px-8 mt-4"
                >
                    <div class="flex items-center relative w-full">
                        <NuxtLink :to="`/profile/1`">
                            <img 
                                class="absolute top-0 rounded-full lg:mx-0 mx-auto" 
                                width="40" 
                                src="https://picsum.photos/id/8/300/320"
                            >
                        </NuxtLink>
                        <div class="ml-14 pt-0.5 w-full">
                            <div class="text-[18px] font-semibold flex items-center justify-between">
                                 comment.user.name 
                                <Icon 
                                    v-if="true"
                                    class="cursor-pointer" 
                                    name="material-symbols:delete-outline-sharp" 
                                    size="25"
                                />
                            </div>
                            <div class="text-[15px] font-light">
                                comment.text 
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mb-28" />
                
            </div>


            <!-- CRETE COMMENT -->
            <div 
                id="CreateComment" 
                v-if="true"
                class="absolute flex items-center justify-between bottom-0 bg-white h-[85px] lg:max-w-[550px] w-full py-5 px-8 border-t-2"
            >
                <div 
                    :class="true ? 'border-2 border-gray-400' : 'border-2 border-[#F1F1F2]'" 
                    class="bg-[#F1F1F2] flex items-center rounded-lg w-full lg:max-w-[420px]"
                >
                    <input 
                        @focus="true"
                        @blur="true"
                        class="bg-[#F1F1F2] text-[14px] focus:outline-none w-full lg:max-w-[420px] p-2 rounded-lg" 
                        type="text"
                        placeholder="Add comment..."
                    >
                </div>
                <button
                    :class="true ? 'text-[#F02C56] cursor-pointer' : 'text-gray-400'" 
                    class="font-semibold text-sm ml-5 pr-1"
                >
                    Post
                </button>
            </div>


        </div>
    </div>
</template>

<script lang="ts" setup >
import {
  onBeforeMount,
  onMounted,
  ref,
  watch,
} from 'vue';

let video = ref<HTMLVideoElement | null>(null);
let isLoaded = ref(false);
let comment = ref(null);
let inputFocused = ref(null);

onMounted(()=> {
    isLoaded.value = true;
    video.value?.play();

});

onBeforeMount(()=> {
    if(video.value) {
        video.value.pause();
        video.value.currentTime = 0;
        video.value.src = '';
    }
});

watch(() => isLoaded.value , ()=> {
    if(isLoaded.value) {
        setTimeout(()=> {
            video.value?.play()
        } , 500)
    }
})


</script>