<template>
    <div class="flex w-full items-center justify-between px-5 py-4 rounded-lg bg-white">
        <ButtonSecondary text="Back to Editor" :is-inside-nav="true" @button-clicked="backToEditor"
            :is-mobile-responsive="false" />
        <ButtonPrimary :text="shareButtonText" :full-width="false" :use-fixed-width="true"
            @click="copyToClipboard(profileLink)" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ButtonPrimary from "@/components/ButtonPrimary.vue"
import ButtonSecondary from "@/components/ButtonSecondary.vue"

export default defineComponent({
    name: "PreviewNavBar",
    props: {
        username: {
            type: String as PropType<string | string[]>,
            required: true,
            default: () => "",
        }
    },
    data() {
        return {
            shareButtonText: "Share Link",
            profileLink: ""
        }
    },
    watch: {
        username() {
            this.profileLink = `${window.location.origin}/profile/${this.username}`
        }
    },

    components: {
        ButtonPrimary,
        ButtonSecondary
    },
    methods: {
        backToEditor() {
            this.$router.push({ name: 'profile-editor' })
        },
        async copyToClipboard(mytext: string) {
            try {
                await navigator.clipboard.writeText(mytext);
                this.shareButtonText = 'Link copied';
                this.resetCopyText()
            } catch (err) {
                this.shareButtonText = 'Failed';
                this.resetCopyText()
            }
        },
        resetCopyText() {
            setTimeout(() => {
                this.shareButtonText = 'Share Link';
            }, 1000);
        }
    }

})
</script>