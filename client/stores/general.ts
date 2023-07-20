import { AxiosStatic } from "axios";
import { error } from "console";
import { NuxtApp } from "nuxt/app";
import IGeneral from "~/models/IGeneral"
import axios from "~/plugins/axios";
import { useUserStore } from "./user";
import { ILikes } from "~/models/IPost";


const $axios = (axios({} as NuxtApp) as { provide: { axios: AxiosStatic } }).provide.axios;

export const useGeneralStore = defineStore('general', {
    state: (): IGeneral => ({
        isLoginOpen: false,
        isEditProfileOpen: false,
        selectedPost: undefined,
        ids: [],
        isBackUrl: '/',
        posts: [],
        suggested: [],
        following: []
    }),

    actions: {

        bodySwitch(val: boolean) {
            if (val) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'visible';
            }
        },

        allLowerCaseNoCaps(str : string) {
            return str.split(' ').join('').toLowerCase()
        },

        setBackUrl(value: string) {
            this.isBackUrl = value;
        },

        async hasSessionExpired() {
            $axios.interceptors.request.use((req) => {
                return req;
            }, (error) => {
                switch (error.response.status) {
                    case 401: // Not logged in 
                    case 419: // Session expired 
                    case 503: // Down for maintenance
                    case 503: // Down for maintenance
                        useUserStore().resetUser();
                        window.location.href = '/';
                        break;
                    case 500:
                        alert("OOPS , something went wrong! Erzhan has been notified");
                        break;
                    default:
                        return Promise.reject(error);
                        break;
                }
            })
        },

        async getRandomUser () {
            try {
                let res = await $axios.get('/api/get-random-users');
                this.suggested = res.data.suggested;
                this.following = res.data.following;    
            } catch (error) {
                
            }
        },

        async getPosts () {
            try {
                let res = await $axios.get('/api/home');
                console.log(res.data.posts);
                this.$state.posts = res.data.posts;
            } catch (error) {
                
            }
        },

        async getPost(post_id : string) {
            try {
                let res = await $axios.get(`/api/posts/${post_id}`);
                this.selectedPost = res.data.post[0];
                this.ids = res.data.ids;
            } catch (error) {
                console.log(error);
            }
        },

        async deletePost (post_id : number) {
            try {
                let res = await $axios.delete(`api/posts/${post_id}`);
                if(!res.data.success) return;
                this.selectedPost = undefined;
                this.posts = this.posts?.filter(post => post.id != post_id);
            } catch (error) {
                
            }
        },

        async likePost (post_id : number) {
            try {
                let res = await $axios.post('/api/likes' , {
                    post_id
                });

                let newLikeData : ILikes = res.data.like;

                for(let a of this.posts ?? []) {
                    if(a.id == post_id) {
                        a.likes.push(newLikeData);
                        break;
                    }
                }

                if(this.selectedPost && this.selectedPost.id == post_id) {
                    this.selectedPost.likes.push(newLikeData);
                }

            } catch (error) {
                
            }
        },
        async unlikePost (like_id : number , post_id : number | null = null) {
            try {
                let res = await $axios.delete(`/api/likes/${like_id}` );

                let newLikeData : number = res.data.user_id;


                for(let a of this.posts ?? []) {
                    a.likes =  a.likes.filter(like => {
                        return like.user_id != newLikeData;
                    })
                }

                if(this.selectedPost && post_id ) {
                    this.selectedPost.likes = this.selectedPost.likes.filter(like => like.id != like_id);
                }
            } catch (error) {
                
            }
        },

        async fetchComment (post_id : number , comment : string) {
            try {
                let res = await $axios.post('/api/comments/' , {post_id , comment});
                let commentData = res.data.comment;
                const {$userStore} = useNuxtApp();
                commentData.user = {
                    id : $userStore.id,
                    name : $userStore.name,
                    image : $userStore.image,
                };
                this.selectedPost?.comments.unshift(commentData);
            } catch (error) {
                
            }
        },

        async deleteComment (comment_id : number) {
            try {
                let res = await $axios.delete(`/api/comments/${comment_id}`);
                if(!res.data.success) return; 
                if(this.selectedPost) {
                    this.selectedPost.comments = this.selectedPost.comments.filter((comment) => comment.id != comment_id);
                }
            } catch (error) {
                
            }
        }

       

    },
})