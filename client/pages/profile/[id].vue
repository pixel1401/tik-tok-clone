<template>
    <NuxtLayout>
        <div 
            v-if="true" 
            class="pt-[90px] 2xl:pl-[240px] lg:pl-[190px] w-[calc(100%-90px)] lg:pr-0 pr-2   2xl:mx-auto"
        >
            <div class="flex overflow-hidden">
                <img 
                    class="md:max-w-[120px] md:max-h-[120px] max-w-[80px] max-h-[80px] aspect-square rounded-full"
                    :src="image"
                    
                >
                <div class="ml-5 w-full">
                    <div class="md:text-[30px] text-[20px] font-bold truncate overflow-hidden md:max-w-max max-w-[100px]">
                       {{ $generalStore.allLowerCaseNoCaps(name ?? '') }}
                    </div>
                    <div class="text-[18px] truncate">{{ name }}</div>
                    <button 
                        v-if="isOwnerProfile"
                        @click="$generalStore.isEditProfileOpen = true"
                        class="flex item-center rounded-md py-1.5 px-3.5 mt-3 text-[15px] font-semibold border hover:bg-gray-100"
                    >
                        <Icon class="mt-0.5 mr-1" name="mdi:pencil" size="18"/>
                        <div>Edit profile</div>
                    </button>

                    <button 
                        v-else
                        @click="isFollow ? unFollow() : followUser(id ?? 0)"
                        class="flex item-center rounded-md py-1.5 px-8 mt-3 text-[15px] text-white font-semibold bg-[#F02C56]"
                    >
                    {{ isFollow ? 'UnFollow' : 'Follow'}}
                    </button>
                </div>
            </div>

            <div class="flex items-center pt-4 flex-wrap md:flex-nowrap">
                <div class="mr-4">
                    <span class="font-bold">{{ $userStore.following?.length }}</span>
                    <span class="text-gray-500 font-light text-[15px] pl-1.5">Following</span>
                </div>
                <div class="mr-4">
                    <span class="font-bold">{{ $userStore.followers?.length }}</span>
                    <span class="text-gray-500 font-light text-[15px] pl-1.5">Followers</span>
                </div>
                <!-- <div class="mr-4">
                    <span class="font-bold">5</span>
                    <span class="text-gray-500 font-light text-[15px] pl-1.5">Likes</span>
                </div> -->
            </div>

            <div class="pt-4 mr-4 text-gray-500 font-light text-[15px] pl-1.5 max-w-[500px]">
                {{ bio }}
            </div>

            <div class="w-full flex items-center pt-4 border-b">
                <div class="w-60 text-center py-2 text-[17px] font-semibold border-b-2 border-b-black">Videos</div>
                <div class="w-60 text-gray-500 text-center py-2 text-[17px] font-semibold">
                    <Icon name="material-symbols:lock-open" class="mb-0.5"/> Liked
                </div>
            </div>

            <div v-if="$profileStore.posts?.length ?? 0 > 0"  class="mt-4 grid 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3">
                    <PostUser v-for="post in $profileStore.posts" :link="post.video" :text="post.text" :id="post.id"  :key="post.id"/>
            </div>
        </div> 
    </NuxtLayout >

</template>

<script  setup lang="ts">
import useFollow from '~/hooks/useFollow';
import { storeToRefs } from 'pinia';

let isOwnerProfile = ref<boolean>(false);


const route = useRoute();
const {$generalStore , $profileStore , $userStore} = useNuxtApp();

const {name , id , image , bio ,} = storeToRefs($profileStore)



const {isFollow , followUser, unFollow} = useFollow(route?.params?.id != undefined ? +route.params.id : 0);



onMounted( async () => {
    if(route.params.id) {
        await $profileStore.getProfile(route.params.id as string);
        isOwnerProfile.value = $userStore.id == $profileStore.id;
    }
})

</script>