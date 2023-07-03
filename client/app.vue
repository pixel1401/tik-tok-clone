<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
    <AuthOverlay v-if="isShow"/>
    <EditProfileOverlay v-if="isEditProfileOpen" />
  </div>
</template>


<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  const {$generalStore} = useNuxtApp();

  const {isLoginOpen : isShow , isEditProfileOpen} = storeToRefs($generalStore);
</script>