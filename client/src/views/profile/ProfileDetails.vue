<template>
    <div class="bg-white rounded-lg min-h-[720px] flex flex-col justify-between items-center">
        <div class="p-10 w-full">
            <div class="text-left">
                <h1 class="text-4xl font-bold text-gray-700 pb-2">Profile Details</h1>
                <h2 class="text-gray-400 text-base">Add your details to create a personal touch to your profile.
                </h2>
            </div>
            <div class="rounded-lg bg-gray-100 ">
                upload photo here
            </div>
            <form class="rounded-lg bg-gray-100 p-5 space-y-5 mt-10">
                <div class="grid w-full grid-cols-12">
                    <div class="text-gray-400 hidden md:flex items-center justify-start col-span-4">First name</div>
                    <div class="col-span-12 md:col-span-8">
                        <InputField type="text" name="first-name" id="first-name" placeholder="e.g. John" label="First name"
                            :value="firstName" :error="error.firstName" :use-row-label="true" :hide-input-icon="true" />
                    </div>
                </div>
                <div class="grid w-full grid-cols-12">
                    <div class="text-gray-400 hidden md:flex items-center justify-start col-span-4">Last name</div>
                    <div class="col-span-12 md:col-span-8">
                        <InputField type="text" name="last-name" id="last-name" placeholder="e.g. Appleseed"
                            label="Email address" :value="email" :error="error.email" :use-row-label="true"
                            :hide-input-icon="true" />
                    </div>
                </div>
                <div class="grid w-full grid-cols-12">
                    <div class="text-gray-400 hidden md:flex items-center justify-start col-span-4">Email</div>
                    <div class="col-span-12 md:col-span-8">
                        <InputField type="email" name="email" id="email" placeholder="e.g. email@example.com" label="Last name"
                            :value="lastName" :error="error.lastName" :use-row-label="true" :hide-input-icon="true" />
                    </div>
                </div>
            </form>
        </div>
        <div class="mt-10 w-full flex items-center justify-end p-6 border-t border-gray-200" v-if="profileChanged">
            <div class="w-fit-content">
                <ButtonPrimary text="Save" :is-inside-nav="false" :click="submitProfile" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import InputField from "@/components/InputField.vue";

export default defineComponent({
    name: 'ProfileDetails',
    components: {
        ButtonPrimary,
        InputField
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            profileImage: "",
            error: {
                email: "",
                firstName: "",
                lastName: ""
            }
        }
    },
    mounted() {
        console.log("Mounted - get user current details if they exist")
    },
    computed: {
        profileChanged(): boolean {
            return true;
        }
    },
    methods: {
        submitProfile() {
            console.log('submit profile')
        }
    }
})
</script>