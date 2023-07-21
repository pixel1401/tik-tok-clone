<template>
    <div  
        @click="displayPost"
    @mouseenter="isHover(true)" @mouseleave="isHover(false)"
        class=" relative brightness-90 hover:brightness-[1.1] cursor-pointer">
            <div v-if="!isLoaded"
                class="absolute flex items-center justify-center top-0 left-0 aspect-[3/4] w-full object-cover rounded-md bg-black">
                <Icon class="animate-spin ml-1" name="mingcute:loading-line" size="100" color="#FFFFFF" />
            </div>
        <div>
            <!-- <video ref="video" muted loop class="aspect-[3/4] object-cover rounded-md" src="https://www.shutterstock.com/shutterstock/videos/1029569669/preview/stock-footage-dnipro-ukraine-may-people-play-bumperball-zorbsoccer-outdoor-party-time-may-in.webm" /> -->
            <video ref="video" muted loop class="aspect-[3/4] object-cover rounded-md" :src="props.link" />
        </div>
        <div class="px-1">
            <div class="text-gray-700 text-[15px] pt-1 break-words">
                {{ text }}
            </div>
            <div class="flex items-center -ml-1 text-gray-600 font-bold text-xs">
                <Icon name="gg:loadbar-sound" size="20" />
                3%
                <Icon class="ml-1" name="tabler:alert-circle" size="16" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

const isLoaded = ref(false);
const video = ref<HTMLVideoElement | null>(null)

const {$generalStore} = useNuxtApp();
const route = useRoute();
const router = useRouter();

const props = defineProps(['link' , 'text' , 'id']);

onMounted(()=> {
        video.value?.addEventListener("loadeddata" , (e) => {
            if(e.target) {
                setTimeout(()=> {
                    isLoaded.value = true;
                } , 200)
            }
        })
});

onBeforeUnmount(()=> {
    if(video.value) {
        video.value.pause();
        video.value.currentTime = 0;
        video.value.src = '';
    }
})

const isHover = (bool : boolean) => {
    if (bool) {
        video.value?.play()
    } else {
        video.value?.pause()
    }
}

const displayPost = () => {
    $generalStore.setBackUrl(`/profile/${route.params.id}`);
    $generalStore.selectedPost = undefined;
    setTimeout(() => {
        return router.push(`/post/${props.id}`);
    } , 300)
}

</script>