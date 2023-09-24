<template>
    <form class="bg-white rounded-lg min-h-[720px] flex flex-col justify-between items-center"
        @submit.prevent="submitProfile">
        <div class="p-10 w-full">
            <div class="text-left">
                <h1 class="text-4xl font-bold text-gray-700 pb-2">Profile Details</h1>
                <h2 class="text-gray-400 text-base">Add your details to create a personal touch to your profile.
                </h2>
            </div>
            <div class="rounded-lg bg-gray-100 space-y-5 mt-10 p-5">
                <div class="grid w-full grid-cols-12">
                    <div class="text-gray-400 hidden md:flex items-center justify-start col-span-4">Profile picture</div>
                    <div class="col-span-12 md:col-span-8 grid grid-cols-12 gap-x-6">
                        <div class="col-span-6 w-48 h-48 rounded-lg bg-purple-100 flex items-center justify-center" :style="{
                            backgroundImage: `url(${previewProfileImage ? previewProfileImage : profileData.userProfileImage})`,
                            backgroundOrigin: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }">
                            <input type="file" id="files" accept="image/*" class="hidden" @change="handleFileUpload">
                            <label for="files"
                                class="p-5 flex flex-col justify-center items-center space-y-2 cursor-pointer">
                                <div v-show="!profileData.userProfileImage && !previewProfileImage">
                                    <UploadImageIcon :fill="profileData.userProfileImage ? '#ffffff' : '#633CFF'" />
                                </div>
                                <p class="text-white font-bold p-2 bg-gray-100 rounded-full"
                                    v-show="profileData.userProfileImage || previewProfileImage">
                                    <PencilIcon class="text-gray-400 w-4 h-4" />
                                </p>
                                <p class="text-purple-700 font-bold"
                                    v-show="!profileData.userProfileImage && !previewProfileImage">+ Upload Image</p>
                            </label>
                        </div>
                        <div class=" text-gray-400 col-span-6 flex items-center justify-start text-left text-sm">Image must
                            be below 1024x1024px. Use PNG or JPG
                            format.</div>
                    </div>
                </div>
            </div>
            <div class="rounded-lg bg-gray-100 p-5 space-y-5 mt-10">
                <div class="grid w-full grid-cols-12">
                    <div class="text-gray-400 hidden md:flex items-center justify-start col-span-4">First name</div>
                    <div class="col-span-12 md:col-span-8">
                        <InputField type="text" name="firstName" id="first-name" placeholder="e.g. John" label="First name"
                            :value="profileData.firstName" :error="error.firstName" :use-row-label="true"
                            :hide-input-icon="true" :default-value="profileData.firstName" @input="setFormValue" />
                    </div>
                </div>
                <div class="grid w-full grid-cols-12">
                    <div class="text-gray-400 hidden md:flex items-center justify-start col-span-4">Last name</div>
                    <div class="col-span-12 md:col-span-8">
                        <InputField type="text" name="lastName" id="last-name" placeholder="e.g. Appleseed"
                            label="Email address" :value="profileData.lastName" :error="error.lastName"
                            :use-row-label="true" :hide-input-icon="true" :default-value="profileData.lastName"
                            @input="setFormValue" />
                    </div>
                </div>
                <div class="grid w-full grid-cols-12">
                    <div class="text-gray-400 hidden md:flex items-center justify-start col-span-4">Bio</div>
                    <div class="col-span-12 md:col-span-8">
                        <TextArea name="bio" id="bio" placeholder="" label="Bio" :value="profileData.bio" :error="error.bio"
                            :use-row-label="true" @input="setFormValue" :default-value="profileData.bio" />
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10 w-full flex items-center justify-end p-6 border-t border-gray-200">
            <div class="w-fit-content">
                <ButtonPrimary text="Save" :is-inside-nav="false" :disabled="!profileChangesMade" />
            </div>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
    PencilIcon
} from '@heroicons/vue/20/solid'
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import InputField from "@/components/InputField.vue";
import TextArea from "@/components/TextArea.vue";
import UploadImageIcon from "@/assets/icons/UploadImage.vue"
import { UserProfileDetails, FormValueFunction, UserProfile } from "@/types";

export default defineComponent({
    name: 'ProfileDetails',
    components: {
        ButtonPrimary,
        InputField,
        UploadImageIcon,
        TextArea,
        PencilIcon,
    },
    props: {
        profileData: {
            type: Object as PropType<UserProfile>,
            required: true
        },
        accessToken: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        userProfileDetails: {
            type: Object as PropType<UserProfileDetails | null>,
            required: true
        },
        setFormValue: {
            type: Function as PropType<FormValueFunction>,
            required: true,

        }
    },
    data() {
        return {
            profileImage: null as File | null,
            previewProfileImage: '' as string | ArrayBuffer | null,
            profileChangesMade: false,
            error: {
                bio: "",
                firstName: "",
                lastName: ""
            }
        }
    },
    watch: {
        profileData: {
            handler() {
                //TODO: refactor this to compare old value vs new value instead
                this.profileChangesMade = true
            },
            deep: true, // Watch nested changes
        },

        profileImage() {
            this.profileChangesMade = true
        },


    },
    methods: {
        submitProfile() {
            // save user profile
            this.updateUserProfile();


        },
        async updateUserProfile() {
            try {
                const UPLOAD_PRESET = process.env.VUE_APP_UPLOAD_PRESET
                const CLOUD_NAME = process.env.VUE_APP_CLOUD_NAME
                const API_URL = process.env.VUE_APP_API_LINK

                let profileImage = this.profileData.userProfileImage;

                // if there's a new image uploaded
                if (this.profileImage) {
                    const formData = new FormData();
                    formData.append('file', this.profileImage);
                    formData.append('upload_preset', UPLOAD_PRESET);
                    formData.append('folder', process.env.VUE_APP_CLOUDINARY_IMAGE_FOLDER);

                    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                        method: 'POST',
                        body: formData,
                    });

                    const data = await response.json();
                    const secure_url = data.secure_url ? data.secure_url : "";
                    profileImage = secure_url;

                    this.$emit("imagePreview", secure_url);
                }

                // send to api
                const res = await fetch(`${API_URL}/profile`, {
                    method: "PATCH",
                    mode: 'cors',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${this.accessToken}`
                    },
                    body: JSON.stringify({
                        ...this.userProfileDetails, profileImage, firstName: this.profileData.firstName, lastName: this.profileData.lastName, bio: this.profileData.bio
                    }),
                });

                const response = await res.json();
                console.log(response);



            } catch (error) {
                console.error('Upload error:', error);
                //TODO: handle error here
            }
        },
        handleFileUpload(event: Event) {
            const target = event.target as HTMLInputElement;
            if (target && target.files) {
                this.profileImage = target.files[0]
                // upload file to cloudinary once user saves
                // generate base64 string of image for preview purposes only
                let reader = new FileReader();
                // callback function to run, when FileReader finishes its job
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    // Note: arrow function used here, so that "this refers to the Vue component
                    // Read image as base64 and set to preview profile image
                    if (e.target) {
                        // emit event to show image preview.
                        this.previewProfileImage = e.target.result;
                        this.$emit("imagePreview", this.previewProfileImage);
                    }

                };

                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(target.files[0]);
            }

        }
    }
})
</script>
