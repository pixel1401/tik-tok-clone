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
    </div>
</template>

<script setup>
    const route = useRoute();
</script>