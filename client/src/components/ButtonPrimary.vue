<template>
    <button class="text-white font-bold py-2 px-4 rounded-lg w-full" :disabled="disabled" :class="{
        'cursor-not-allowed hover:bg-purple-100 bg-purple-100': disabled,
        'cursor-pointer bg-purple-700 hover:bg-purple-300': !disabled
    }" @click="$emit('buttonClicked')">
        {{ text }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ButtonPrimary",
    props: {
        text: String,
        disabled: {
            type: Boolean,
            default: false
        }
    },
});
</script>