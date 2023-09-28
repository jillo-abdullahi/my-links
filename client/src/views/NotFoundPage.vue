<template>
    <div class="w-full h-[85vh] flex items-center justify-center">
        <div class="flex flex-col sm:flex-row gap-12 justify-center items-center">
            <div class="flex flex-col justify-center items-center space-y-4">
                <div class="w-96 h-96">
                    <NotFoundRobot />
                </div>
                <div class="text-center w-full px-6 sm:p-0">
                    <h1 class="font-bold text-3xl pb-2 text ">Oops! We lost that page </h1>
                    <p class="text">But don't worry, we're here to help you find your way back.</p>
                    <div class="mt-4">
                        <ButtonPrimary text="Back Home" @click="backHome" />
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import NotFoundRobot from '@/assets/icons/NotFoundRobot.vue';


export default defineComponent({
    name: 'NotFoundPage',
    components: {
        ButtonPrimary,
        NotFoundRobot
    },
    methods: {
        backHome() {
            // navigate to dashboard    
            //TODO: If the user is not logged in, give them the option
            // to log in or sign up from the dashboard/profile-editor page
            this.$router.push({ name: 'profile-editor' });
        },
    },
});
</script>
<style scoped>
.text {
    text-wrap: balance
}
</style>