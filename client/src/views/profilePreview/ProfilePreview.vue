<template>
    <div class="relative min-h-screen w-full -mt-12 ">
        <div class="absolute top-0 inset-x-0 bg-purple-700 rounded-b-2xl h-1/4"></div>
        <div class="relative p-6 z-10">
            <ProfileNavBar />
        </div>
        <div class="relative flex justify-center z-10">
            <ProfileLinks />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileNavBar from "./NavBar.vue"
import ProfileLinks from "./ProfileLinks.vue"

export default defineComponent({
    name: "ProfilePreview",
    components: {
        ProfileNavBar,
        ProfileLinks
    },
    data() {
        return {
            profileImage: 'https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg'

        }
    },
})

</script>