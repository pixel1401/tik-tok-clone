import IProfile from "~/models/IProfile"

export const useProfileStore = defineStore('profile', {
    state: () : IProfile => ({
        id: 'na', 
        name: 'string',
        bio: 'string',
        image: 'string',
        post : undefined,
        posts : [],
        allLikes : 0
    }),

    actions: {
        //   
    },
})