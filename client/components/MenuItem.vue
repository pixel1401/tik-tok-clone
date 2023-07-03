<template>
    <div class="w-full flex items-center hover:bg-gray-100 p-2.5 rounded-md">
        <div class="flex items-center lg:mx-0 mx-auto">
            <Icon :name="icon" :color="color" :size="size" />
            <span :class="`text-[${color}]`" class="lg:block hidden pl-[9px] mt-0.5 font-semibold text-[17px]">
                {{ iconProps }}
            </span>
        </div>
    </div>
</template>

<script  lang="ts">
import { defineComponent, PropType } from "vue"
// const props = defineProps(['iconString', 'colorString', 'sizeString'])
// const { iconString, colorString, sizeString } = toRefs(props)


export default defineComponent({
    props: {
        iconProps: String,
        color: String,
        size: String
    },
    data() {
        
        let icon = ref('');
        if (this.iconProps === 'For You') icon.value = 'mdi:home'
        if (this.iconProps === 'Following') icon.value = 'ci:group'
        if (this.iconProps === 'LIVE') icon.value = 'ri:live-line'

        return {  icon : icon  };
    }
});



</script>