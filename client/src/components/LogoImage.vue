<template>
    <div class="flex items-center justify-center">
        <img :src="logoImagePath" alt="logo image" />
        <img :src="logoTextPath" alt="logo text" />
    </div>
</template>

<script lang="ts">
export default {
    name: "LogoImage",
    data() {
        return {
            logoImagePath: require("@/assets/logo.svg"),
            logoTextPath: require("@/assets/logo-text.svg"),
        }
    }
};
</script>