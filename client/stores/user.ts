import IUser from "~/models/IUser"

export const useUserStore = defineStore('user', {
    state: () : IUser => ({
        id: undefined, 
        name: undefined,
        bio: undefined,
        image: undefined
    }),

    actions: {
        //   
    },
})