import IGeneral from "~/models/IGeneral"

export const useGeneralStore = defineStore('general', {
    state: (): IGeneral => ({
        isLoginOpen: true,
        isEditProfileOpen: false,
        selectedPost: [],
        ids: undefined,
        isBackUrl: '/',
        posts: undefined,
        suggested: undefined,
        following: undefined
    }),

    actions: {
        closeMod (value : boolean) {
            this.isLoginOpen = value;
        } 
    },
})