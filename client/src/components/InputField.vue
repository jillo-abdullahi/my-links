<template>
    <div>
        <label :for="name" class="block text-sm font-medium leading-6 text-gray-900">{{ label }}</label>
        <div class="relative mt-2 rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <div v-if="type === 'email'">
                    <EmailIcon />
                </div>
                <div v-else-if="name === 'password'">
                    <PasswordIcon />
                </div>
            </div>
            <input :type="type" :name="name" :id="id"
                class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :placeholder="placeholder" v-model="value" />
        </div>
    </div>
</template>
  
<script lang="ts">
import { Component } from 'vue';
import EmailIcon from '@/assets/icons/EmailIcon.vue';
import PasswordIcon from '@/assets/icons/PasswordIcon.vue';

export default {
    name: 'InputField',
    components: { EmailIcon, PasswordIcon },
    props: {
        icon: {
            type: Object as () => Component,
            default: null,

        },
        placeholder: String,
        type: String,
        name: String,
        id: String,
        label: String,
    },
    data() {
        return {
            value: '',
        }
    }


}
</script>