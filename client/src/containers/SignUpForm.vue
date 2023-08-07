<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="mb-14">
            <LogoImage />
        </div>

        <div class="bg-white p-10 rounded-lg w-full max-w-[30rem]">
            <div class="flex flex-col items-start justify-center mb-10">
                <h1 class="text-3xl font-bold text-gray-900">Create account</h1>
                <p class="text-gray-600 mt-2">Let’s get you started with sharing your links!.</p>
            </div>
            <div class="space-y-6">
                <InputField type="username" name="username" id="username" placeholder="e.g. shrewdTurtle"
                    :icon="AtSymbolIcon" label="Username" />
                <InputField type="email" name="email" id="email" placeholder="e.g. alex@email.com" :icon="EmailIcon"
                    label="Email address" />
                <InputField type="password" name="password" id="password" placeholder="At least 8 characters"
                    :icon="PasswordIcon" label="Password" />

                <InputField type="password" name="password" id="password" placeholder="At least 8 characters"
                    :icon="PasswordIcon" label="Confirm password" />
                <ButtonPrimary text="Login" />
                <div class="flex items-center justify-center font-light text-sm space-x-1">
                    <span>Already have an account?</span>
                    <a href="#" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Login</a>
                </div>

            </div>


        </div>

    </div>
</template>
  
<script lang="ts">
import InputField from "../components/InputField.vue";
import EmailIcon from "../assets/icons/EmailIcon.vue";
import PasswordIcon from "../assets/icons/PasswordIcon.vue";
import AtSymbolIcon from "../assets/icons/AtSymbolIcon.vue";
import ButtonPrimary from "../components/ButtonPrimary.vue";
import LogoImage from "../components/LogoImage.vue";

export default {
    name: "SignupForm",
    components: {
        InputField,
        ButtonPrimary,
        LogoImage,

    },
    data() {
        return {
            EmailIcon,
            PasswordIcon,
            AtSymbolIcon
        }
    }
};
</script>
  

  