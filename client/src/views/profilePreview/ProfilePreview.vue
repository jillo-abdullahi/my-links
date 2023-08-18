<template>
    <div class="h-screen w-full -mt-12 ">
        <div class="p-6">
            <ProfileNavBar />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileNavBar from "./NavBar.vue"

export default defineComponent({
    name: "ProfilePreview",
    components: {
        ProfileNavBar
    }
})

</script>