<template>
    <div class="flex flex-col items-start justify-center w-full">
        <label :for="name" class="text-sm font-medium leading-6 pb-2 "
            :class="{ 'text-red-500': error, 'text-gray-900': !error, 'block md:hidden': useRowLabel, 'block': !useRowLabel }">{{
                label }}</label>
        <div class="relative rounded-md shadow-sm w-full">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3" v-if="!hideInputIcon">
                <div v-if="type === 'email'">
                    <EmailIcon />
                </div>
                <div v-else-if="name === 'password' || name === 'confirmPassword'">
                    <PasswordIcon />
                </div>
                <div v-else-if="name === 'username'">
                    <AtSymbolIcon />
                </div>
                <div v-else-if="name === 'link-selector'">
                    <LinkIcon class="text-gray-400 w-4 h-4" />
                </div>
            </div>
            <input :type="inputType" :name="name" :id="id"
                class="block border w-full py-2.5 text-gray-900  placeholder:text-gray-400  sm:text-sm sm:leading-6 rounded-lg bg-white"
                :style="{
                    boxShadow: error ? 'none' : ''
                }" :class="{
    'border-red-500 focus:border-red-500 hover:border-red-500': error,
    ' focus:border-purple-700 active:border-purple-700 hover:border-purple-700 border-gray-300': !error,
    'pl-10': !hideInputIcon,
    'px-4': hideInputIcon
}" :placeholder="placeholder" v-model="value" @input="$emit('setValue')" />

            <button v-if="isPasswordField" class="absolute inset-y-0 right-0 flex items-center pr-3" type="button"
                :class="{ 'cursor-not-allowed': !enablePasswordVisibilityToggle }"
                :disabled="!enablePasswordVisibilityToggle" @click="togglePasswordVisibility">
                <div class="h-5 w-5 text-gray-400" v-show="inputType === 'password'">
                    <EyeIcon />
                </div>
                <div class="h-5 w-5 text-gray-400" v-show="inputType === 'text'">
                    <EyeSlashIcon />
                </div>
            </button>

        </div>
        <div v-if="error" class="text-xs text-red-500 flex items-center pt-1">
            <span>{{ error }}</span>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import {
    LinkIcon
} from '@heroicons/vue/20/solid'
import EmailIcon from '@/assets/icons/EmailIcon.vue';
import PasswordIcon from '@/assets/icons/PasswordIcon.vue';
import AtSymbolIcon from '@/assets/icons/AtSymbolIcon.vue';
import EyeIcon from '@/assets/icons/EyeIcon.vue';
import EyeSlashIcon from '@/assets/icons/EyeSlashIcon.vue';

export default defineComponent({
    name: 'InputField',
    components: { EmailIcon, PasswordIcon, AtSymbolIcon, EyeIcon, EyeSlashIcon, LinkIcon },
    props: {
        placeholder: {
            type: String,
            default: 'text'
        },
        type: {
            type: String,
            default: 'text',
            required: true

        },
        name: {
            type: String,
            default: 'text',
            required: true
        },
        id: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: 'text',
            required: true

        },
        error: {
            type: String,
            default: ''
        },
        defaultValue: {
            type: String,
            default: ''
        },
        useRowLabel: {
            type: Boolean,
            default: false
        },
        hideInputIcon: {
            type: Boolean,
            default: false
        }
    },

    data(): { value: string, inputType: string } {
        return {
            value: this.defaultValue,
            inputType: this.type, // this is to toggle the password visibility
        }
    },
    methods: {
        togglePasswordVisibility(): void {
            if (this.inputType === 'password') {
                this.inputType = "text";
            } else {
                this.inputType = 'password';
            }

            return;
        }
    },
    computed: {
        enablePasswordVisibilityToggle(): boolean {
            return this.isPasswordField && this.value.length > 0;
        },
        isPasswordField(): boolean {
            return this.name === 'password' || this.name === 'confirmPassword';
        }
    }


});
</script>
<style scoped>
input:active,
input:hover,
input:focus {
    /* adding this here because Tailwind can't give me these specifics */
    box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
}
</style>