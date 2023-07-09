import { AxiosStatic } from "axios";
import { error } from "console";
import { NuxtApp } from "nuxt/app";
import IGeneral from "~/models/IGeneral"
import axios from "~/plugins/axios";
import { useUserStore } from "./user";


const $axios  = (axios({} as NuxtApp) as { provide: { axios: AxiosStatic } }).provide.axios;

export const useGeneralStore = defineStore('general', {
    state: (): IGeneral => ({
        isLoginOpen: false,
        isEditProfileOpen: false,
        selectedPost: [],
        ids: undefined,
        isBackUrl: '/',
        posts: undefined,
        suggested: undefined,
        following: undefined
    }),

    actions: {

        bodySwitch(val : boolean) {
            if(val) {
                document.body.style.overflow = 'hidden';
            }else {
                document.body.style.overflow = 'visible';
            }
        },

        async       hasSessionExpired() {
            $axios.interceptors.request.use((req) => {
                return req;
            } , (error) => {
                switch (error.response.status) {
                    case 401: // Not logged in 
                    case 419: // Session expired 
                    case 503: // Down for maintenance
                    case 503: // Down for maintenance
                        useUserStore().resetUser();
                        window.location.href = '/';
                        break;
                    case 500 :
                        alert("OOPS , something went wrong! Erzhan has been notified");
                        break;
                    default:
                        return Promise.reject(error);
                        break;
                }
            })
        }

    },
})