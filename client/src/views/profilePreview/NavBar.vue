<template>
    <div class="flex w-full items-center justify-between px-5 py-4 rounded-lg bg-white">
        <ButtonSecondary text="Back to Editor" :is-inside-nav="true" @button-clicked="backToEditor" />
        <ButtonPrimary text="Share Link" :full-width="false" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonPrimary from "@/components/ButtonPrimary.vue"
import ButtonSecondary from "@/components/ButtonSecondary.vue"

export default defineComponent({
    name: "PreviewNavBar",
    components: {
        ButtonPrimary,
        ButtonSecondary
    },
    methods: {
        backToEditor() {
            this.$router.push({ name: 'profile-editor' })
        }
    }

})
</script>