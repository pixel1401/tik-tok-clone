import IUser from "~/models/IUser"

export const useUserStore = defineStore('user', {
    state: () : IUser => ({
        id: 'na', 
        name: 'string',
        bio: 'string',
        image: 'string'
    }),

    actions: {
        //   
    },
})