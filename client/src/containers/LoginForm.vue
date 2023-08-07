<template>
    <div class="flex flex-col items-center justify-center">
        <LogoImage />
        <h1 class="text-3xl font-bold text-gray-900 mt-6">Welcome back!</h1>
        <p class="text-gray-600 mt-2">Please login to your account.</p>
    </div>
    <InputField type="email" name="email" id="email" placeholder="Enter your email" :icon="EmailIcon"
        label="Email address" />
    <InputField type="password" name="password" id="password" placeholder="Enter your password" :icon="PasswordIcon"
        label="Password" />
    <ButtonPrimary text="Login" />
</template>
  
<script lang="ts">
import InputField from "../components/InputField.vue";
import EmailIcon from "../assets/icons/EmailIcon.vue";
import PasswordIcon from "../assets/icons/PasswordIcon.vue";
import ButtonPrimary from "../components/ButtonPrimary.vue";
import LogoImage from "../components/LogoImage.vue";

export default {
    name: "LoginForm",
    components: {
        InputField,
        ButtonPrimary,
        LogoImage
    },
    data() {
        return {
            EmailIcon,
            PasswordIcon,

        }
    }
};
</script>
  

  