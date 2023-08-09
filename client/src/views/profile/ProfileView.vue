<template>
    <div class="-mt-12">
        <div class="p-6">
            <NavBar />
            <div>This is the profile view</div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";

export default defineComponent({
    name: "ProfileView",
    components: {
        NavBar,
    },
});
</script>