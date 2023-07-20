import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'



export default defineNuxtPlugin((_NuxtApp) => {

    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = 'http://localhost:8000'

    

    // Интерцептор запросов
//    axios.interceptors.request.use((config  ) => {
//     // Добавьте здесь свою обработку запроса
//     console.log('Запрос отправлен', config)
//     return config
//   })

//   // Интерцептор ответов
//   axios.interceptors.response.use((response: AxiosResponse) => {
//     // Добавьте здесь свою обработку ответа
//     console.log('Ответ получен', response)
//     return response
//   })

  // Интерцептор ошибок
  axios.interceptors.response.use(
    undefined,
    (error: AxiosError) => {
        //   console.error('Ошибка запроса', error);
        const {$generalStore} = useNuxtApp();
        // if(error.data)
        console.log(error.response?.data);
        if((error.response?.data as any)?.message  == 'Unauthenticated.') {
            $generalStore.isLoginOpen = true;
        }
        
    }
  )

    return {
        provide : {
            axios : axios
        }
    }
})

