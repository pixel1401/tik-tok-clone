<template>
    <NuxtLayout>
        <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
            <div >
                <PostMain  v-for="post in $generalStore.posts" :post="post" />
            </div>
        </div>
        
    </NuxtLayout>
    
</template>

<script setup lang="ts">

    const {$generalStore} = useNuxtApp();

    onMounted( async ()=> {
        await $generalStore.getPosts();
    })

</script>