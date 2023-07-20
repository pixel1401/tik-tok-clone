<template>
    <div :class="route.fullPath === '/' ? 'lg:w-[310px]' : 'lg:w-[220px]'"
        class="fixed z-20 bg-white pt-[70px] h-full lg:border-r-0 border-r w-[75px] overflow-auto">
        <div class="lg:w-full w-[55px] mx-auto">
            <NuxtLink to="/">
                <MenuItem iconProps="For You" color="#F02C56" size="30" />
            </NuxtLink>
            <MenuItem iconProps="Following" color="#000000" size="27" />
            <MenuItem iconProps="LIVE" color="#000000" size="27" />
        </div>

        <!-- ! SUGGESTED ACCOUNT -->
        <div class="border-b lg:ml-2 mt-2" />

        <div class="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
            Suggested accounts
        </div>

        <div class="lg:hidden block pt-3" />

        <div v-if="$generalStore.suggested?.length ?? 0 > 0">
            <div v-for="user in $generalStore.suggested" :key="user.id"  @click="isLoggedIn(user)" class="cursor-pointer">
                <MenuItemFollow :id="user.id" :name="user.name" :img="user.image" />
            </div>
        </div>

        <button class="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">
            See all
        </button>

        <!-- ! FOLLOWING ACCOUNT -->
        <div>
            <div class="border-b lg:ml-2 mt-2" />

            <div class="lg:block hidden text-xs text-gray-600 font-semibold pt-4 pb-2 px-2">
                Following accounts
            </div>

            <div class="lg:hidden block pt-3" />

            <div v-if="$generalStore.following?.length ?? 0 > 0">
                <div v-for="user in $generalStore.following" :key="user.id" @click="isLoggedIn(user)" class="cursor-pointer">
                    <MenuItemFollow :id="user.id" :name="user.name" :img="user.image" />
                </div>
            </div>

            <button class="lg:block hidden text-[#F02C56] pt-1.5 pl-2 text-[13px]">See more</button>

        </div>
        <!-- ! FOLLOWING END ACCOUNT -->


        <div class="lg:block hidden border-b lg:ml-2 mt-2" />

        <div class="lg:block hidden text-[11px] text-gray-500">
            <div class="pt-4 px-2">About Newsroom TikTok Shop Contact Careers ByteDance</div>
            <div class="pt-4 px-2">TikTok for Good Advertise Developers Transparency TikTok Rewards TikTok Browse TikTok
                Embeds</div>
            <div class="pt-4 px-2">Help Safety Terms Privacy Creator Portal Community Guidelines</div>
            <div class="pt-4 px-2">© 2023 TikTok</div>
        </div>

        <div class="pb-14"></div>
    </div>
</template>

<script setup lang="ts" >
import IUser from '~/models/IUser';
const route = useRoute();
const router = useRouter();


const {$generalStore , $userStore} = useNuxtApp();



const isLoggedIn = (user : IUser ) => {
    if(!$userStore.id) {
        $generalStore.isLoginOpen = true;
        return;
    }

    router.push(`/profile/${user?.id ?? '1'}`);
}

</script>