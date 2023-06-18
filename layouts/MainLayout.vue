<template>
    <div class="h-50 bg-cyan-950">
        <!-- <NuxtLink  to="https://nuxtjs.org"> -->
        <!-- <img src='~/assets/images/tiktok-logo.png' /> -->
        <!-- </NuxtLink> -->
        <TopNav></TopNav>
        <div :class="route.fullPath === '/' ? 'max-w-[1140px]' : ''"
            class="flex justify-between mx-auto w-full lg:px-2.5 px-0">
            <div>
                <SideNavMenu />

            </div>
            <slot />

        </div>

    </div>
</template>

<script setup>
const route = useRoute();
</script>