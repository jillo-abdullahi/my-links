<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="mb-14">
            <LogoImage />
        </div>

        <div class="bg-white p-10 rounded-lg w-full max-w-[30rem]">
            <div class="flex flex-col items-start justify-center mb-10">
                <h1 class="text-3xl font-bold text-gray-900 mt-6">Forgot Password</h1>
                <p class="text-gray-600 mt-2">We'll send a reset link to your email address.</p>
            </div>
            <div class="space-y-6 mb-2">
                <form class="space-y-6">
                    <InputField type="email" name="email" id="email" placeholder="Enter your email" :icon="EmailIcon"
                        label="Email address" />

                    <ButtonPrimary text="Send Link" />
                </form>
            </div>

        </div>

    </div>
</template>
  
<script lang="ts">
import InputField from "../components/InputField.vue";
import EmailIcon from "../assets/icons/EmailIcon.vue";
import ButtonPrimary from "../components/ButtonPrimary.vue";
import LogoImage from "../components/LogoImage.vue";

export default {
    name: "ForgotPasswordForm",
    components: {
        InputField,
        ButtonPrimary,
        LogoImage
    },
    data() {
        return {
            EmailIcon,
        }
    }
};
</script>
  

  