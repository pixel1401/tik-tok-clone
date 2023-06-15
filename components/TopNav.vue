<template>
    <div id="TopNav" class="fixed z-30 flex items-center w-full border-b h[61px] bg-white">
        <div :class="route.fullPath == '/' ? 'max-w-[1150px]' : ''"
            class="flex items-center justify-between w-full px-6 mx-auto">
            <div :class="route.fullPath == '/' ? 'w-[80%]' : 'lg:w-[20%] w-[70%]'">
                <NuxtLink to="/">
                    <img src="~/assets/images/tiktok-logo.png" width="115" alt="Logo">
                </NuxtLink>
            </div>
            <div class=" hidden md:flex items-center bg-light-grey p-1 rounded-full max-w-[380px] w-full">
                <input type="text"
                    class=" w-full pl-3 my-3 bg-transparent placeholder-input-grey text-[15px] focus:outline-none"
                    placeholder="Search accounts" />
                <div class=" px-3 py-1 flex items-center border-l  border-l-grey">
                    <Icon name="ri:search-line" color="#A1A2A7" size="22" />
                </div>
            </div>
            <div class="flex items-center justify-end gap-3 max-w-[320px] min-w-[230px] w-full">
                <button class="flex items-center border rounded-sm px-3 py-[6px] hover:bg-grey-600">
                    <Icon name="mdi:plus" color="#0000000" size="22" />
                    <span class="px-2 font-medium text-[15px]">Upload</span>
                </button>

                <div v-if="false"  class="flex items-center">
                    <button class="flex items-center bg-red gap-3 px-3 py-[6px] border rounded-md text-white">
                        <span class=" font-medium text-[15px]  mx-4">Log in</span>
                    </button>
                    <Icon name="mdi:dots-vertical" color="#161724" size="25" />
                </div>


            </div>

            <div class="flex items-center ml-3">
                <Icon name="carbon:send-alt" class=" ml-1 mr-4" color="#161724" size="30"/>
                <Icon name="bx:message-detail" class="mr-5" color="#161724" size="27" />
                <div class="relative">
                    <button class=" mt-1 w-[33px] h-[33px]"  @click="isShow = !isShow">
                        <img class=" rounded-full" width="33" src="https://picsum.photos/200/200" alt="Logo">
                    </button>
                    <div v-if="isShow" class=" w-[200px] shadow-xl top-[43px] -right-2 absolute py-1.5 rounded-lg bg-white">
                        <div class="flex items-center justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer">
                            <Icon name="ph:user" size="20"/>
                            <span class="pl-2 font-semibold text-sm">Profile</span>
                        </div>
                        <div class="flex items-center justify-start py-3 px-2 hover:bg-gray-100 cursor-pointer">
                            <Icon name="ic:outline-log-in" size="20"/>
                            <span class="pl-2 font-semibold text-sm">Log out</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
    const route = useRoute();
    const isShow = ref(false)

    

</script>