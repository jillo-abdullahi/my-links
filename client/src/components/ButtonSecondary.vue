<template>
    <button
        class="text-purple-700 border-2 border-purple-700 font-bold py-2 px-4 rounded-lg cursor-pointer bg-transparent hover:bg-purple-300"
        :class="{ 'w-full': !isInsideNav }" @click="$emit('buttonClicked')">

        <div :class="{ 'sm:hidden block': isResponsiveAndInNav, 'hidden': !isResponsiveAndInNav }">
            <ViewOnMobileIcon />
        </div>

        <div :class="{ 'hidden sm:block': isResponsiveAndInNav, 'block': !isResponsiveAndInNav }">{{ text }}</div>
    </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ViewOnMobileIcon from "@/assets/icons/ViewOnMobileIcon.vue"

export default defineComponent({
    name: "ButtonSecondary",
    components: {
        ViewOnMobileIcon
    },
    props: {
        text: String,
        isInsideNav: {
            type: Boolean,
            default: false,
        },
        isMobileResponsive: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        isResponsiveAndInNav() {

            return this.isInsideNav && this.isMobileResponsive
        }
    }

});
</script>