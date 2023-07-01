import { useGeneralStore } from "~/stores/general"
import { useProfileStore } from "~/stores/profile"
import { useUserStore } from "~/stores/user"

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide : {
            userStore : useUserStore(),
            profileStore : useProfileStore(),
            generalStore : useGeneralStore()
        }
    }
})