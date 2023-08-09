<template>
    <button class="text-white font-bold py-2 px-4 rounded-lg w-full" :disabled="disabled" :class="{
        'cursor-not-allowed hover:bg-indigo-500 bg-indigo-500': disabled,
        'cursor-pointer bg-indigo-600 hover:bg-indigo-700': !disabled
    }">
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