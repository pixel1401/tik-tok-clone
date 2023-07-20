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
  const {$generalStore , $userStore} = useNuxtApp();

  const {isLoginOpen : isShow , isEditProfileOpen} = storeToRefs($generalStore);

  onMounted( async () => {

    $generalStore.bodySwitch(false);
    isShow.value = false;
    isEditProfileOpen.value = false;

    try {
      await $generalStore.hasSessionExpired();
      await $userStore.getUser();
      await $generalStore.getRandomUser();
      

    } catch (error) {
      console.log(error);
    }
  })


  watch(() => isShow.value , (val) => $generalStore.bodySwitch(val));
  watch(()=> isEditProfileOpen.value , (val) => $generalStore.bodySwitch(val));

</script>