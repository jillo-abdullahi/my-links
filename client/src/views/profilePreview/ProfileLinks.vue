<template>
    <div class="rounded-xl py-12 px-14 flex flex-col gap-y-14 bg-white">
        <div class="flex flex-col">
            <div class="flex flex-col justify-center items-center gap-y-6">
                <div class="bg-gray-300 w-24 h-24 rounded-full" :style="{
                    backgroundImage: `url(${userProfileDetails.profileImage})`,
                    backgroundOrigin: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }"></div>
                <h1 class="text-3xl font-bold text-gray-900">{{ `${userProfileDetails.firstName}
                                    ${userProfileDetails.lastName}` }}</h1>
            </div>
            <p class="text-gray-400 font-light">{{ userProfileDetails.profession }}</p>
        </div>

        <div class="flex flex-col">
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
import { UserProfileDetails } from '@/types';


export default defineComponent({
    name: 'ProfileLinks',
    components: {
        LinkButton
    },
    props: {
        userProfileDetails: {
            type: Object as PropType<UserProfileDetails>,
            required: true
        }
    },

})
</script>