<template>
    <NuxtLayout>
        <div class="pt-[80px] w-[calc(100%-90px)] max-w-[690px]">
            <div v-if="posts" >
                <PostMain  v-for="post in posts" :post="post" :key="post.id" />
            </div>
        </div>
        
        
    </NuxtLayout>
    
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
    const {$generalStore} = useNuxtApp();

    const {posts} = storeToRefs($generalStore );

    onMounted( ()=> {
        getPosts();
        
    });

    const getPosts = async () => {
        await $generalStore.getPosts();
    }

   

</script>