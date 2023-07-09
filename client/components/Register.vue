<template>
    <div class="text-center text-[28px] mb-4 font-bold">Sign up</div>

    <div class="px-6 pb-2">
        <TextInput placeholder="Full name" v-model:input="name" inputType="text" :autoFocus="true"
            :error="errors && errors.name ? errors.name[0] : ''" />
    </div>

    <div class="px-6 pb-2">
        <TextInput placeholder="Email address" v-model:input="email" inputType="email"
            :error="errors && errors.email ? errors.email[0] : ''" />
    </div>

    <div class="px-6 pb-2">
        <TextInput placeholder="Password" v-model:input="password" inputType="password"
            :error="errors && errors.password ? errors.password[0] : ''" />
    </div>

    <div class="px-6 pb-2">
        <TextInput placeholder="Confirm password" v-model:input="confirmPassword" inputType="password"
            :error="errors && errors.confirmPassword ? errors.confirmPassword[0] : ''" />
    </div>
    <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

    <div class="px-6 pb-2 mt-6">
        <button :disabled="(!name || !email || !password || !confirmPassword)"
            :class="(!name || !email || !password || !confirmPassword) ? 'bg-gray-200' : 'bg-[#F02C56]'" @click="register()"
            class="w-full text-[17px] font-semibold text-white bg-[#F02C56] py-3 rounded-sm">
            Sign up
        </button>
    </div>
</template>

<script setup lang="ts">


const { $userStore , $generalStore } = useNuxtApp();

let name = ref<string | null>(null)
let email = ref<string | null>(null);
let password = ref<string | null>(null)
let confirmPassword = ref<string | null>(null)
let errors = ref<{
    confirmPassword?: [string],
    password?: [string],
    email?: [string],
    name?: [string]
} | null>(null)

const register = async () => {
    try {
        await $userStore.getTokens();
        await $userStore.register(name.value!, email.value!, password.value!, confirmPassword.value!);
        await $userStore.getUser();

        $generalStore.isLoginOpen = false;

    } catch (error : any) {
        console.log(error , "REGISTER API ERROR");
        errors.value = error.response.data.errors
    }
}
</script>