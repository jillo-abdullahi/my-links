<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="mb-14">
            <LogoImage />
        </div>

        <div class="bg-white p-10 rounded-lg w-full max-w-[30rem]">
            <div class="flex flex-col items-start justify-center mb-10">
                <h1 class="text-3xl font-bold text-gray-900 mt-6">Login</h1>
                <p class="text-gray-600 mt-2">Add your details below to get back into the app.</p>
            </div>
            <div class="space-y-6 mb-2">
                <form class="space-y-6" @submit.prevent="submitForm">
                    <InputField type="email" name="email" id="email" placeholder="Enter your email" :icon="EmailIcon"
                        label="Email address" :value="email" @input="setValue" />
                    <InputField type="password" name="password" id="password" placeholder="Enter your password"
                        :icon="PasswordIcon" label="Password" :value="password" @input="setValue" />
                    <ButtonPrimary text="Login" />
                </form>

                <div class="flex items-center justify-center font-light text-sm space-x-1">
                    <span>Don’t have an account?</span>
                    <router-link to="/signup" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Create an
                        account</router-link>
                </div>

            </div>
            <router-link to="/forgot-password" class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Forgot
                password</router-link>

        </div>

    </div>
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
            email: '',
            password: ''
        }
    },
    methods: {
        submitForm() {
            console.log('Form submitted', this.email, this.password);

            // api call to login
        },
        setValue(event: InputEvent) {
            const name = (event.target as HTMLInputElement).name;
            const value = (event.target as HTMLInputElement).value;

            if (name === 'email') {
                this.email = value;
            } else if (name === 'password') {
                this.password = value;
            }
        },

    }
};
</script>
  

  