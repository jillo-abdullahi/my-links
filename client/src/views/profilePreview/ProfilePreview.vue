<template>
    <div class="relative min-h-screen w-full -mt-12 ">
        <div class="absolute top-0 inset-x-0 bg-purple-700 rounded-none sm:rounded-b-md h-96" :style="{
            backgroundImage: `url(${hasError ? backgroundErrorImage : backgroundImage})`,
            backgroundOrigin: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }"></div>
        <div class="relative p-6 z-10" v-show="showNavBar">
            <ProfileNavBar :username="fetchedUsername" :loading="loading" />
        </div>
        <div class="relative flex justify-center z-10" :class="{ 'pt-40': hasError || loading }">
            <ProfileLinks :user-profile-details="userProfileDetails" :error="error" :has-error="hasError" :loading="loading"
                @refetchUserProfile="fetchUserProfile" :username="username" />
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
    components: {
        ProfileNavBar,
        ProfileLinks
    },
    data() {
        return {
            backgroundImage: require("@/assets/wave-bg.svg"),
            backgroundErrorImage: require("@/assets/wave-error-bg.svg"),
            username: '' as string,
            userProfileDetails: {} as UserProfileDetails,
            error: {
                internalError: false,
                userNotFound: false
            } as {
                internalError: boolean,
                userNotFound: boolean
            },
            loading: true as boolean,
            fetchedUsername: '' as string

        }
    },
    computed: {
        hasError(): boolean {
            return this.error.internalError || this.error.userNotFound;
        },
        showNavBar(): boolean {
            // check if user is admin
            const isAdmin = this.username === this.fetchedUsername
            return !this.hasError && isAdmin;

            // TODO: Add check for logged in user as well
            // show 'Login to Edit' text if user is an admin but not logged in
        }
    },
    watch: {
        username() {
            // get user profile once username is available
            this.fetchUserProfile();
        }
    },
    mounted() {
        this.username = this.$route.params.username as string;
    },
    methods: {
        fetchUserProfile() {
            const apiUrl = process.env.VUE_APP_API_LINK

            fetch(`${apiUrl}/profile/${this.username}`, {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json()).then((response) => {
                const { statusCode } = response;
                if (response.username) {
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
                    this.fetchedUsername = response.username;

                } else {
                    this.error = {
                        internalError: statusCode === 500,
                        userNotFound: statusCode === 404
                    }
                }

                this.loading = false;

            }).catch(() => {
                this.error = {
                    internalError: true,
                    userNotFound: false
                }
                this.loading = false;
            })
        }
    }

})
</script>