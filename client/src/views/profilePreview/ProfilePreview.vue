<template>
    <div class="relative min-h-screen w-full -mt-12 ">
        <div class="absolute top-0 inset-x-0 bg-purple-700 rounded-none sm:rounded-b-md h-96" :style="{
            backgroundImage: `url(${backgroundImage})`,
            backgroundOrigin: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }"></div>
        <div class="relative p-6 z-10">
            <ProfileNavBar />
        </div>
        <div class="relative flex justify-center z-10">
            <ProfileLinks :user-profile-details="userProfileDetails" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileNavBar from "./NavBar.vue"
import ProfileLinks from "./ProfileLinks.vue"
import { UserProfileDetails } from '@/types';

export default defineComponent({
    name: "ProfilePreview",
    data() {
        return {
            backgroundImage: require("@/assets/wave-bg.svg"),
            username: '' as string | string[],
            userProfileDetails: {} as UserProfileDetails
        }
    },
    watch: {
        username() {
            // fetch user profile
            const apiUrl = process.env.VUE_APP_API_LINK

            fetch(`${apiUrl}/profile/${this.username}`, {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json()).then((response) => {

                // TODO: display this on the mobile screen
                console.log(response)

                const {
                    userId,
                    firstName,
                    lastName,
                    bio,
                    profession,
                    profileImage,
                    backgroundImage,
                    links,
                } = response.profile;

                this.userProfileDetails = {
                    userId,
                    firstName,
                    lastName,
                    bio,
                    profession,
                    profileImage,
                    backgroundImage,
                    links,
                };

            }).catch((err) => {
                //TODO: show this on the UI
                console.log(err)
            })
        }
    },
    components: {
        ProfileNavBar,
        ProfileLinks
    },
    mounted() {
        this.username = this.$route.params.username;
    },

})

</script>