<template>
    <div class="-mt-12">
        <div class="p-6">
            <NavBar />
            <div class="pt-6">
                <MobilePreview />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import MobilePreview from "./MobilePreview.vue";

export default defineComponent({
    name: "ProfileView",
    components: {
        NavBar,
        MobilePreview,
    },
});
</script>