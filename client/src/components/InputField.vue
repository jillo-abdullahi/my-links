<template>
    <div class="flex flex-col items-start justify-center w-full">
        <label :for="name" class="block text-sm font-medium leading-6 "
            :class="{ 'text-red-500': error, 'text-gray-900': !error }">{{ label }}</label>
        <div class="relative mt-2 rounded-md shadow-sm w-full">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <div v-if="type === 'email'">
                    <EmailIcon />
                </div>
                <div v-else-if="name === 'password' || name === 'confirmPassword'">
                    <PasswordIcon />
                </div>
                <div v-else-if="name === 'username'">
                    <AtSymbolIcon />
                </div>
            </div>
            <input :type="inputType" :name="name" :id="id"
                class="block w-full rounded-md py-2.5 pl-10 text-gray-900 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 focus:ring-2 focus:ring-inset"
                :class="{ 'border-red-500 border-0 ring-1 focus:ring-red-500 ring-red-500': error, ' focus:ring-indigo-600 border-0 ring-1': !error }"
                :placeholder="placeholder" v-model="value" @input="$emit('setValue', value)" />

            <button v-if="isPasswordField && !error"
                class="absolute inset-y-0 right-0 flex items-center pr-3" type="button"
                :class="{ 'cursor-not-allowed': !enablePasswordVisibilityToggle }"
                :disabled="!enablePasswordVisibilityToggle" @click="togglePasswordVisibility">
                <div class="h-5 w-5 text-gray-400" v-show="inputType === 'password'">
                    <EyeIcon />
                </div>
                <div class="h-5 w-5 text-gray-400" v-show="inputType === 'text'">
                    <EyeSlashIcon />
                </div>
            </button>
            <div v-if="error" class="absolute text-xs text-red-500 inset-y-0 right-0 flex items-center pr-3">
                <span>{{ error }}</span>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';
import EmailIcon from '@/assets/icons/EmailIcon.vue';
import PasswordIcon from '@/assets/icons/PasswordIcon.vue';
import AtSymbolIcon from '@/assets/icons/AtSymbolIcon.vue';
import EyeIcon from '@/assets/icons/EyeIcon.vue';
import EyeSlashIcon from '@/assets/icons/EyeSlashIcon.vue';

export default defineComponent({
    name: 'InputField',
    components: { EmailIcon, PasswordIcon, AtSymbolIcon, EyeIcon, EyeSlashIcon },
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
    },

    data(): { value: string, inputType: string } {
        return {
            value: '',
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