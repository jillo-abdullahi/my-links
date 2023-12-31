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
                    <InputField type="email" name="email" id="email" placeholder="Enter your email" label="Email address"
                        :value="email" @input="setValue" :error="error.email" />
                    <InputField type="password" name="password" id="password" placeholder="Enter your password"
                        label="Password" :value="password" @input="setValue" :error="error.password" />
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
import { defineComponent } from "vue";
import InputField from "../components/InputField.vue";
import ButtonPrimary from "../components/ButtonPrimary.vue";
import LogoImage from "../components/LogoImage.vue";

export default defineComponent({
    name: "LoginForm",
    components: {
        InputField,
        ButtonPrimary,
        LogoImage,
    },
    data() {
        return {
            email: '',
            password: '',
            error: {
                email: '',
                password: '',
                loginError: '',
            }
        }
    },
    watch: {
        email() {
            this.error.email = ''; // reset email error once user starts typing
        },
        password() {
            this.error.password = ''; // reset password error once user starts typing
        }
    },
    methods: {
        submitForm() {
            const emptyErrorText = 'Cannot be empty';

            if (!this.email) {
                this.error.email = emptyErrorText;
            } else {
                this.error.email = '';
            }

            if (!this.password) {
                this.error.password = emptyErrorText;
            } else if (this.password.length < 8) {
                this.error.password = 'Password must be at least 8 characters';
            } else {
                this.error.password = '';
            }

            if (this.error.email || this.error.password) {
                return;
            }
            console.log('Form submitted', this.email, this.password);

            // api call to login

            // send to api
            const apiUrl = process.env.VUE_APP_API_LINK

            fetch(`${apiUrl}/auth/signin`, {
                method: "POST",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                }),
            }).then((res) => res.json()).then((response) => {
                if (response.statusCode === 500) {

                    // TODO: Show this on the UI
                    this.error.loginError = "Internal server error"
                } else if (response.statusCode === 403) {
                    this.error.email = "Incorrect credentials";
                    this.error.password = "Incorrect credentials";
                } else {
                    // store response in local storage
                    const userDetails = JSON.stringify(response)
                    localStorage.setItem("DevLinksUserDetails", userDetails);

                    // navigate to dashboard    
                    this.$router.push({ name: 'profile-editor' });
                }
            })
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
});
</script>
  

  