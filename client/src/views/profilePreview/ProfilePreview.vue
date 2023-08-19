<template>
    <div class="min-h-screen w-full -mt-12 ">
        <div class="p-6">
            <ProfileNavBar />
        </div>
        <div class="flex justify-center">
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