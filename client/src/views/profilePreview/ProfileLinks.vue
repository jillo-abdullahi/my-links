<template>
    <div
        class="rounded-xl py-12 px-14 flex flex-col gap-y-14 bg-white w-full max-w-[400px] mx-4 sm:mx-0 min-h-[450px] items-center justify-center">
        <div class="flex flex-col">
            <div class="flex flex-col justify-center items-center gap-y-6" v-if="!hasError">
                <!-- user profile image  -->
                <div v-if="isLoadingProfile" class="animate-pulse flex items-center justify-center">
                    <div class="bg-gray-300 w-24 h-24 rounded-full"></div>
                </div>
                <div v-if="!isLoadingProfile" class="bg-gray-300 w-24 h-24 rounded-full" :style="{
                    backgroundImage: `url(${userProfileDetails.profileImage})`,
                    backgroundOrigin: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }"></div>

                <!-- profile first and last name  -->
                <div v-if="isLoadingProfile" class="animate-pulse flex items-center justify-center">
                    <div class="bg-gray-300 w-48 h-5 rounded-full"></div>
                </div>
                <h1 v-else class="text-3xl font-bold text-gray-900">{{ `${userProfileDetails.firstName}
                                    ${userProfileDetails.lastName}` }}</h1>
            </div>
            <div class="flex flex-col justify-center items-center gap-y-6 w-full" v-else>

                <!-- icons  -->
                <div class="w-48 h-48" :class="{ 'bg-gray-300 rounded-full': error.userNotFound }">
                    <div v-if="error.userNotFound">
                        <NotFoundIcon />
                    </div>
                    <div v-if="error.internalError">
                        <InternalServerErrorIcon />
                    </div>
                </div>

                <!-- title text  -->
                <div v-if="error.userNotFound">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Profile not found
                    </h1>
                    <p class="text-gray-700 pt-2">
                        Sorry, the profile you are looking for does not exist.
                    </p>
                </div>
                <div v-if="error.internalError">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Internal server error
                    </h1>
                    <p class="text-gray-700 pt-2">
                        An internal server error occurred.
                    </p>
                </div>

                <!-- error cta button -->
                <div class="flex flex-col justify-center items-center mt-4" v-if="error.internalError">
                    <ButtonPrimary text="Retry" :use-fixed-width="true" @click="refetchUserProfile" />
                </div>

            </div>
            <!-- profession of user  -->
            <div v-if="isLoadingProfile" class="animate-pulse flex items-center justify-center mt-2">
                <div class="bg-gray-300 w-40 h-3 rounded-full"></div>
            </div>
            <p v-if="!isLoadingProfile" class="text-gray-400 font-light">{{ userProfileDetails.profession }}</p>
        </div>

        <!-- profile links  -->
        <div class="flex flex-col animate-pulse" v-if="isLoadingProfile">
            <div class="rounded-md bg-gray-300 h-14 w-72 my-4"></div>
            <div class="rounded-md bg-gray-300 h-14 w-72 my-4"></div>
            <div class="rounded-md bg-gray-300 h-14 w-72 my-4"></div>
        </div>
        <div class="flex flex-col" v-if="!isLoadingProfile">
            <div class="cursor-pointer rounded-lg p-4 flex items-center justify-between hover:bg-opacity-90"
                v-for="(link, index) in userProfileDetails.links" :key="index" :href="link.url">
                <LinkButton :link="link" />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import LinkButton from '@/components/LinkButton.vue';
import NotFoundIcon from '@/assets/icons/NotFoundIcon.vue';
import InternalServerErrorIcon from '@/assets/icons/InternalServerErrorIcon.vue'
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import { UserProfileDetails } from '@/types';


export default defineComponent({
    name: 'ProfileLinks',
    components: {
        LinkButton,
        NotFoundIcon,
        InternalServerErrorIcon,
        ButtonPrimary
    },
    props: {
        userProfileDetails: {
            type: Object as PropType<UserProfileDetails>,
            required: true
        },
        error: {
            type: Object as PropType<{
                internalError: boolean,
                userNotFound: boolean
            }>,
            default: () => ({
                internalError: true,
                userNotFound: false
            })
        },
        hasError: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        profileHasNoLinks() {
            return this.userProfileDetails.links.length === 0 && !this.loading && !this.error.internalError && !this.error.internalError;
        },
        isLoadingProfile() {
            return this.loading && !this.error.internalError && !this.error.internalError;
        }

    },
    methods: {
        refetchUserProfile() {
            this.$emit('refetchUserProfile');
        }
    }

})
</script>