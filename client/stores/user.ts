import { AxiosStatic } from "axios";
import { NuxtApp } from "nuxt/app";
import IUser from "~/models/IUser"
import axios from "~/plugins/axios";

const $axios = (axios({} as NuxtApp) as { provide: { axios: AxiosStatic } }).provide.axios;


export const useUserStore = defineStore('user', {
    state: (): IUser => ({
        id: undefined,
        name: undefined,
        bio: undefined,
        image: undefined,
        followers : [],
        following : []
    }),

    actions: {
        async getTokens() {
            await $axios.get('/sanctum/csrf-cookie');
        },

        async login(email: string, password: string) {
            await $axios.post('/login', {
                email,
                password
            })
        },

        async register(name: string, email: string, password: string, confirmPassword: string,) {
            await $axios.post('/register', {
                email,
                name,
                password,
                password_confirmation: confirmPassword
            })
        },

        async getUser() {
            try {
                let res = await $axios.get<String, any>('/api/logged-in-user');
                let dataUser: IUser = res.data[0];
                this.setUser(dataUser);
            } catch (error) {
                console.log(error);

            }

        },

        async followUser (follow_id : number) {
            try {
                let res = await $axios.post('/api/follow' , {
                    follow_id
                });
                if(res.status !=200 ) return ;
                this.followers?.push(res.data.follow);
            } catch (error) {
                
            }
        },

        async deleteFollow (id : number) {
            try {
                let res = await $axios.delete(`/api/follow/${id}`);
                if(res.status !=200 ) return ;
                this.followers = this.followers?.filter(follow => follow.id != id);
            } catch (error) {
                
            }
        },


        async createPost(data: FormData) {
            return await $axios.post('/api/posts', data);
        },


        async logout() {
            await $axios.post('/logout');
            this.resetUser();
        },



        resetUser() {
            this.$state.bio = undefined,
                this.$state.name = undefined,
                this.$state.image = undefined,
                this.$state.id = undefined;
                this.$state.followers = undefined;
                this.$state.following = undefined;
        },

        setUser(dataUser: IUser) {
            this.$state.id = dataUser.id;
            this.$state.bio = dataUser.bio;
            this.$state.name = dataUser.name;
            this.$state.image = dataUser.image;
            this.$state.followers = dataUser.followers,
            this.$state.following = dataUser.following
        },

        isLoggedIn(user: IUser) {
            if (!this.id) {
                return;
            }
            const router = useRouter();
            router.push(`profile/${user?.id ?? -1}`);
        },


    },
})