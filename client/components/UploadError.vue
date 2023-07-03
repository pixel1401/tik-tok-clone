<template>
    <div class="w-[100%] relative flex justify-center">
        <div class="
                absolute 
                top-6 
                z-50 
                mx-auto 
                bg-black 
                bg-opacity-70 
                text-white 
                px-14 
                py-3 
                rounded-sm 
            " :class="errorType ? 'visible' : 'invisible'">
            {{ error }}
        </div>
    </div>
</template>

<script  lang="ts">

export default defineComponent({
    props: {
        errorTypeProps: {
            type: String,
            required: true
        },
    },
    data() {
        const { errorTypeProps: errorType } = toRefs(this.$props);
        let error = ref('');
        
        return { errorType, error };
    },

    watch: {
        errorTypeProps() {
            if (this.errorType == 'caption') {
                this.error = "Maxium 150 characters!!!";
            } else if (this.errorType.valueOf() == 'bio') {
                this.error = "Maxium 80 characters!!!";
            } else if (this.errorType.valueOf() == 'file') {
                this.error = 'Unsupported file. Use MP4 instead.'
            } else {
                this.error = 'Waht'
            }
        }
    }
});

</script>