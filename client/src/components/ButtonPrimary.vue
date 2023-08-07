<template>
    <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg w-full">
        {{ text }}
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "ButtonPrimary",
    props: {
        text: String,
    },
});
</script>