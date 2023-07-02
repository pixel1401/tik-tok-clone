<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
    <AuthOverlay v-if="isShow"/>
    <EditProfileOverlay/>
  </div>
</template>


<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  const {$generalStore} = useNuxtApp();

  const {isLoginOpen : isShow} = storeToRefs($generalStore);
</script>