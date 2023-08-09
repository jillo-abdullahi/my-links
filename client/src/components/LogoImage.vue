<template>
    <div class="flex items-center justify-center space-x-1">
        <div class="shrink-0 min-w-8">
            <img :src="logoImagePath" alt="logo image" :class="{ 'w-8': isInsideNav, }" />
        </div>
        <div class="shrink-0" :class="{ 'md:block hidden': isInsideNav }">
            <img :src="logoTextPath" alt="logo text" :class="{ 'h-5': isInsideNav }" />
        </div>

    </div>
</template>

<script lang="ts">
export default {
    name: "LogoImage",
    props: {
        isInsideNav: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            logoImagePath: require("@/assets/logo.svg"),
            logoTextPath: require("@/assets/logo-text.svg"),
        }
    }
};
</script>