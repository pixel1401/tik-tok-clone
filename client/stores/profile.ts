import IProfile from "~/models/IProfile"
import axios from "~/plugins/axios";
import { AxiosStatic } from "axios";
import { NuxtApp } from "nuxt/app";
import { log } from "console";

const $axios  = (axios({} as NuxtApp) as { provide: { axios: AxiosStatic } }).provide.axios;

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
        async getProfile(id : string) {
            try {
                let data = await $axios.get(`api/profiles/${id}`);

                let user = data.data.user[0];
                let posts = data.data.posts;

                console.log(user , posts);
                

                this.$state.id = user.id;
                this.$state.bio = user.bio;
                this.$state.image = user.image;
                this.$state.name = user.name;
                this.$state.posts = posts;

            } catch (error) {
                
            }
            
        } 
    },
})