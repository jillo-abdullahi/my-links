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
                    <div class="col-span-12 md:col-span-8">
                        <div>
                            <input type="file" id="files" accept="image/*" class="hidden" @change="handleFileUpload">
                            <label for="files"
                                class="rounded-lg bg-purple-100 p-10 flex flex-col justify-center items-center space-y-2 cursor-pointer">
                                <UploadImageIcon />
                                <p class="text-purple-700 font-bold">+ Upload Image</p>
                            </label>
                            <span class=" text-gray-400 text-sm">Image must be below 1024x1024px. Use PNG or JPG
                                format.</span>
                        </div>
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
                    <div class="text-gray-400 hidden md:flex items-center justify-start col-span-4">Email</div>
                    <div class="col-span-12 md:col-span-8">
                        <InputField type="email" name="email" id="email" placeholder="e.g. email@example.com"
                            label="Last name" :value="profileData.email" :error="error.email" :use-row-label="true"
                            :hide-input-icon="true" @input="setFormValue" :default-value="profileData.email" />
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
import { defineComponent } from 'vue';
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import InputField from "@/components/InputField.vue";
import UploadImageIcon from "@/assets/icons/UploadImage.vue"

export default defineComponent({
    name: 'ProfileDetails',
    components: {
        ButtonPrimary,
        InputField,
        UploadImageIcon
    },

    data() {
        return {
            profileData: {
                firstName: "A first name",
                lastName: "Somebodu",
                email: "boobear@gmeil.com",
            } as {
                firstName: string,
                lastName: string,
                email: string,
            },
            profileImage: null as File | null,
            previewProfileImage: '' as string | ArrayBuffer | null,
            profileChangesMade: false,

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
    },
    watch: {
        profileData: {
            handler() {
                console.log("SOMETHING CHANGED HERE")
                this.profileChangesMade = true
            },
            deep: true, // Watch nested changes
        },

    },

    methods: {
        submitProfile() {
            console.log('submit profile', this.profileData);
            if (!this.profileImage) return;

            // save image to cloudinary
            this.saveImageToCloudinary(this.profileImage);


        },
        async saveImageToCloudinary(imageFile: File) {
            try {
                //TODO: store these in .env
                const UPLOAD_PRESET = 'DevLinks'
                const CLOUD_NAME = 'dsuhsqcb2'

                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('upload_preset', UPLOAD_PRESET);

                const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                const secure_url = data.secure_url ? data.secure_url : "";

                if (secure_url) {
                    // TODO: save to db
                    this.previewProfileImage = secure_url

                    this.$emit("imagePreview", secure_url);
                }
            } catch (error) {
                console.error('Upload error:', error);
                //TODO: handle error here
            }
        },
        setFormValue(event: InputEvent) {
            const name = (event.target as HTMLInputElement).name as 'firstName' || 'lastName' || 'email';
            const value = (event.target as HTMLInputElement).value;

            this.profileData[name] = value;

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
                    // Read image as base64 and set to previewProfileImage
                    if (e.target) {
                        this.previewProfileImage = e.target.result;

                        // emit event to show image preview.
                        this.$emit("imagePreview", e.target.result);
                    }

                };

                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(target.files[0]);
            }

        }
    }
})
</script>
<style scoped></style>