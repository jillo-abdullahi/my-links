<template>
    <button class="text-white font-bold py-3 px-4 rounded-lg" :disabled="disabled" :class="{
        'cursor-not-allowed bg-purple-300': disabled,
        'cursor-pointer bg-purple-700 hover:bg-opacity-90': !disabled,
        'w-full': fullWidth, 'w-32': useFixedWidth
    }" @click="$emit('buttonClicked')">
        <div v-if="!isInProgressState">{{ text }}</div>
        <div class="w-full flex items-center justify-center py-2" v-else-if="isInProgressState">
            <ProgressSpinner />
        </div>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProgressSpinner from "./ProgressSpinner.vue"

export default defineComponent({
    name: "ButtonPrimary",
    components: {
        ProgressSpinner
    },
    props: {
        text: {
            type: String,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        fullWidth: {
            type: Boolean,
            default: true
        },
        isInProgressState: {
            type: Boolean,
            default: false
        },
        useFixedWidth: {
            type: Boolean,
            default: false
        }
    },
});
</script>