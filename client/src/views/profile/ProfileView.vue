<template>
    <div class="-mt-12">
        <div class="p-6">
            <NavBar />
            <div class="pt-6 grid grid-cols-12 gap-x-6">
                <div class="col-span-5">
                    <MobilePreview />
                </div>
                <div class="col-span-7">
                    <CustomizeLinks />
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import MobilePreview from "./MobilePreview.vue";
import CustomizeLinks from "./CustomizeLinks.vue";

export default defineComponent({
    name: "ProfileView",
    components: {
        NavBar,
        MobilePreview,
        CustomizeLinks,
    },
});
</script>