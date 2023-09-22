<template>
    <div class="flex flex-col items-start justify-center w-full">
        <label :for="name" class="text-sm font-medium leading-6 pb-2 "
            :class="{ 'text-red-500': error, 'text-gray-900': !error, 'block md:hidden': useRowLabel, 'block': !useRowLabel }">{{
                label }}</label>
        <div class="relative rounded-md shadow-sm w-full">
            <textarea :name="name" :id="id" :rows="5"
                class="block border w-full py-2.5 text-gray-900  placeholder:text-gray-400  sm:text-sm sm:leading-6 rounded-lg bg-white"
                :style="{
                    boxShadow: error ? 'none' : ''
                }" :class="{
    'border-red-500 focus:border-red-500 hover:border-red-500': error,
    ' focus:border-purple-700 active:border-purple-700 hover:border-purple-700 border-gray-300': !error,
}" :placeholder="placeholder" v-model="value" @input="$emit('setValue')" />
        </div>
        <div v-if="error" class="text-xs text-red-500 flex items-center pt-1">
            <span>{{ error }}</span>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TextArea',
    props: {
        placeholder: {
            type: String,
            default: 'text'
        },
        name: {
            type: String,
            default: 'text',
            required: true
        },
        id: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: 'text',
            required: true

        },
        error: {
            type: String,
            default: ''
        },
        defaultValue: {
            type: String,
            default: ''
        },
        useRowLabel: {
            type: Boolean,
            default: false
        },
    },

    data(): { value: string } {
        return {
            value: this.defaultValue,
        }
    },

    watch: {
        defaultValue(val: string) {
            this.value = val
        }
    }
});
</script>
<style scoped>
textarea:active,
textarea:hover,
textarea:focus {
    /* adding this here because Tailwind can't give me these specifics */
    box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
}
</style>