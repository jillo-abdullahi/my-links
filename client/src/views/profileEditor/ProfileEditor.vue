<template>
    <div class="-mt-12">
        <div class="p-6">
            <NavBar @change-tabs="setActiveTab" :tabs="tabs" />
            <div class="pt-6 grid grid-cols-12 gap-x-6">
                <div class="col-span-5 hidden md:block">
                    <MobilePreview
                        :profile-image-preview="profileImagePreview ? profileImagePreview : profileData.userProfileImage"
                        :bio="profileData.bio" :username="username" />
                </div>
                <div class="col-span-12 md:col-span-7">
                    <div v-if="profileTabActive">
                        <ProfileDetails @image-preview="getProfileImagePreview" :access-token="accessToken"
                            :profile-data="profileData" :user-id="userId" :username="username"
                            :set-form-value="setFormValue" :user-profile-details="userProfileDetails" />
                    </div>
                    <div v-else-if="linksTabActive">
                        <CustomizeLinks :access-token="accessToken" :user-id="userId"
                            :user-profile-details="userProfileDetails" />
                    </div>
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
import ProfileDetails from "./ProfileDetails.vue";
import { UserProfileDetails, UserProfile } from "@/types";

export default defineComponent({
    name: "ProfileEditor",
    data() {
        return {
            tabs: [
                { name: 'Links', current: true },
                { name: 'Profile', current: false },
            ] as { name: string, current: boolean }[],
            profileImagePreview: '',
            profileData: {
                firstName: "",
                lastName: "",
                bio: "",
                userProfileImage: "",
            } as UserProfile,
            // details about user
            accessToken: '',
            userId: '',
            username: '',
            userProfileDetails: null as UserProfileDetails | null,
        }
    },
    components: {
        NavBar,
        MobilePreview,
        CustomizeLinks,
        ProfileDetails
    },
    computed: {
        linksTabActive(): boolean {
            return this.tabs[0].current === true;
        },
        profileTabActive(): boolean {
            return this.tabs[1].current === true;
        }
    },
    methods: {
        setActiveTab(tabIndex: number): void {
            this.tabs.forEach((tab, index) => {
                if (index === tabIndex) {
                    tab.current = true;
                } else {
                    tab.current = false;
                }
            })
        },

        getProfileImagePreview(base64Image: string): void {
            this.profileImagePreview = base64Image
        },

        setFormValue(event: InputEvent) {
            const name = (event.target as HTMLInputElement).name as 'firstName' || 'lastName' || 'email';
            const value = (event.target as HTMLInputElement).value;

            this.profileData[name] = value;

        },
    },
    mounted() {
        // get user dettails from local storage
        const storedUserDetails = localStorage.getItem('DevLinksUserDetails')
        if (storedUserDetails) {
            const user = JSON.parse(storedUserDetails)
            const { access_token } = user;
            if (access_token) {
                //verify user details
                const apiUrl = process.env.VUE_APP_API_LINK

                fetch(`${apiUrl}/auth/verify-user`, {
                    method: "GET",
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${access_token}`
                    },

                }).then((res) => res.json()).then((response) => {
                    if (response.statusCode === 500) {

                        // TODO: Show this on the UI
                        console.log(response)
                    } else if (response.statusCode === 403) {
                        // token is invalid. Send to login form
                        // TODO: Show this on the UI to indicate that the token is invalid
                        this.$router.push({ name: 'SignIn' })
                    } else {
                        const { username, id } = response
                        this.userId = id;
                        this.username = username;
                        this.accessToken = access_token;
                    }
                })
            } else {
                this.$router.push({ name: 'SignIn' })
            }

        } else {
            // prompt user to sign in again
            this.$router.push({ name: 'SignIn' })
        }

    },

    watch: {
        username() {
            // send to api
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
                this.profileData.firstName = firstName;
                this.profileData.lastName = lastName;
                this.profileData.bio = bio;
                this.profileData.userProfileImage = profileImage;

                // show image on the mobile preview section
                if (profileImage) this.$emit("imagePreview", profileImage);
            }).catch((err) => {

                //TODO: show this on the UI
                console.log(err)
            })
        }
    }
});
</script>