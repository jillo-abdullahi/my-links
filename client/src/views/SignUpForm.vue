<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="mb-14">
            <LogoImage />
        </div>

        <div class="bg-white p-10 rounded-lg w-full max-w-[30rem]">
            <div class="flex flex-col items-start justify-center mb-10">
                <h1 class="text-3xl font-bold text-gray-900">Create account</h1>
                <p class="text-gray-600 mt-2">Let’s get you started with sharing your links.</p>
            </div>
            <div class="space-y-6">
                <form class="space-y-6" @submit.prevent="submitForm">
                    <InputField type="username" name="username" id="username" placeholder="e.g. shrewdTurtle"
                        label="Username" @input="setValue" :error="error.username" />

                    <InputField type="email" name="email" id="email" placeholder="e.g. alex@email.com" label="Email address"
                        @input="setValue" :error="error.email" />

                    <InputField type="password" name="password" id="password" placeholder="At least 8 characters"
                        label="Password" @input="setValue" :error="error.password" />

                    <InputField type="password" name="confirmPassword" id="confirmPassword"
                        placeholder="At least 8 characters" label="Confirm password" @input="setValue"
                        :error="error.confirmPassword" />

                    <ButtonPrimary text="Create new account" :disabled="disableSubmitButton" />
                </form>

                <div class="flex items-center justify-center font-light text-sm space-x-1">
                    <span>Already have an account?</span>
                    <router-link to="/"
                        class="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Login</router-link>
                </div>

            </div>


        </div>

    </div>
</template>
  
<script lang="ts">
import { defineComponent } from "vue";
import InputField from "../components/InputField.vue";
import ButtonPrimary from "../components/ButtonPrimary.vue";
import LogoImage from "../components/LogoImage.vue";

export default defineComponent({
    name: "SignupForm",
    components: {
        InputField,
        ButtonPrimary,
        LogoImage,

    },
    data() {
        return {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    watch: {
        username() {
            this.error.username = ''; // reset username error once user starts typing
        },
        email() {
            this.error.email = ''; // reset email error once user starts typing
        },
        password() {
            this.error.password = ''; // reset password error once user starts typing
        },
        confirmPassword() {
            this.error.confirmPassword = ''; // reset password error once user starts typing
        }
    },
    computed: {
        disableSubmitButton(): boolean {
            return Boolean(this.error.username && this.error.email && this.error.password && this.error.confirmPassword);
        },
    },
    methods: {
        submitForm() {
            const emptyErrorText = 'Cannot be empty';

            if (!this.username) {
                this.error.username = emptyErrorText;
            } else {
                this.error.username = '';
            }

            if (!this.email) {
                this.error.email = emptyErrorText;
            } else {
                this.error.email = '';
            }

            if (!this.password) {
                this.error.password = emptyErrorText;
            } else if (this.password.length < 8) {
                this.error.password = 'at least 8 characters';
            } else if (this.confirmPassword !== this.password) {
                this.error.password = 'passwords do not match';
            } else {
                this.error.password = '';
            }

            if (!this.confirmPassword) {
                this.error.confirmPassword = emptyErrorText;
            } else if (this.confirmPassword.length < 8) {
                this.error.confirmPassword = 'at least 8 characters';
            } else if (this.confirmPassword !== this.password) {
                this.error.confirmPassword = 'passwords do not match';
            } else {
                this.error.confirmPassword = '';
            }

            if (this.error.email || this.error.password || this.error.username || this.error.confirmPassword) {
                return;
            }
            console.log('Form submitted', this.email, this.password);
            console.log('submit form', this.username, this.email, this.password, this.confirmPassword);
        },
        setValue(event: InputEvent) {
            const name = (event.target as HTMLInputElement).name;
            const value = (event.target as HTMLInputElement).value;

            if (name === 'email') {
                this.email = value;
            } else if (name === 'password') {
                this.password = value;
            } else if (name === 'confirmPassword') {
                this.confirmPassword = value;
            } else if (name === 'username') {
                this.username = value;
            }
        },
    }
});
</script>
  

  