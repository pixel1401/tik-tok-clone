import IProfile from "~/models/IProfile"
import axios from "~/plugins/axios";
import { AxiosStatic } from "axios";
import { NuxtApp } from "nuxt/app";
import { log } from "console";
import IUser from "~/models/IUser";
import IPost from "~/models/IPost";

const $axios = (axios({} as NuxtApp) as { provide: { axios: AxiosStatic } }).provide.axios;

export const useProfileStore = defineStore('profile', {
    state: (): IProfile => ({
        bio: undefined,
        id: undefined,
        name: undefined,
        image: undefined,
        post: undefined,
        posts: [],
        allLikes: 0
    }),

    actions: {
        async   getProfile(id: string) {
            try {
                let data = await $axios.get(`api/profiles/${id}`);

                let user: IUser = data.data.user[0];
                let posts: IPost[] = data.data.posts;

                
                this.setUserInfo(user);
                this.$state.posts = posts;

            } catch (error) {

            }
        },

        async updateUser(name: string, bio?: string) {
            try {
                let data = await $axios.patch('/api/update-user', {
                    name,
                    bio
                })
                this.setUserInfo(data.data.user[0]);
                return data;
            } catch (error) {
                console.log(error, "eEEError");
            }
        },

        async updateUserImage (formData : FormData) {
            try {
                let data = await $axios.post("/api/update-user-image" , formData);

                console.log(data.data);

                this.setUserInfo(data.data.user[0]);
                
            } catch (error) {
                console.log(error , 'EROROROR');
                
            }
        },


        setUserInfo(userInfo: IUser) {
            this.$state.id = userInfo.id;
            this.$state.bio = userInfo.bio;
            this.$state.image = userInfo.image;
            this.$state.name = userInfo.name;
        }
    },
})