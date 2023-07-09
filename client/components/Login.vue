<template>
    <div class="text-center text-[28px] mb-4 font-bold">Log in</div>

    <div class="px-6 pb-1.5 text-[15px]">Email address</div>

    <div class="px-6 pb-2">
        <TextInput placeholder="Email address" v-model:input="email" inputType="email" :autoFocus="true"
            :error="errors && errors.email ? errors.email[0] : ''" @update:input="inputMethods" />
    </div>

    <div class="px-6 pb-2">
        <TextInput placeholder="Password" v-model:input="password" inputType="password" />
    </div>
    <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>

    <div class="px-6 pb-2 mt-6">
        <button 
            @click="login()" class="w-full text-[17px] font-semibold text-white py-3 rounded-sm bg-[#F02C56]">
            Log in
        </button>
    </div>
</template>

<script setup lang="ts">

    const {$axios , $userStore , $generalStore} = useNuxtApp();

let email = ref(null);
let password = ref(null);
let errors = ref<{
    email: [String],
} | null>(null)
const login = async () => {
    try {
        await $userStore.getTokens();
        await $userStore.login(email.value ?? '' , password.value ?? '');
        await $userStore.getUser();
        
        $generalStore.isLoginOpen = false;
    } catch (error : any) {
        console.log(error);
        errors.value =  error.response.data.errors
    }
}


// :disabled="(!email || !password)" :class="(!email || !password) ? 'bg-gray-200' : 'bg-[#F02C56]'"

const inputMethods = (e: String): String => {
    return e;
}


</script>