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
                            backgroundImage: `url(${previewProfileImage})`,
                            backgroundOrigin: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }">
                            <input type="file" id="files" accept="image/*" class="hidden" @change="handleFileUpload">
                            <label for="files"
                                class="p-5 flex flex-col justify-center items-center space-y-2 cursor-pointer">
                                <UploadImageIcon :fill="previewProfileImage ? '#ffffff' : '#633CFF'" />
                                <p class="text-white font-bold" v-if="previewProfileImage">Change Image</p>
                                <p class="text-purple-700 font-bold" v-else>+ Upload Image</p>

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
                        <InputField type="text" name="bio" id="bio" placeholder="" label="Bio" :value="profileData.bio"
                            :error="error.email" :use-row-label="true" :hide-input-icon="true" @input="setFormValue"
                            :default-value="profileData.bio" />
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10 w-full flex items-center justify-end p-6 border-t border-gray-200">
            <div class="w-fit-content">
                <ButtonPrimary text="Save" :is-inside-nav="false" :disabled="!profileChangesMade" />
            </div>
            <button @click="notify">Notify me</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import InputField from "@/components/InputField.vue";
import UploadImageIcon from "@/assets/icons/UploadImage.vue"
import ToastNotification from "@/components/ToastNotification.vue"
import { useToast } from 'vue-toastification'


export default defineComponent({
    name: 'ProfileDetails',
    components: {
        ButtonPrimary,
        InputField,
        UploadImageIcon,
    },

    data() {
        return {
            profileData: {
                firstName: "",
                lastName: "",
                bio: "",
            } as {
                firstName: string,
                lastName: string,
                bio: string,
            },
            profileImage: null as File | null,
            previewProfileImage: '' as string | ArrayBuffer | null,
            profileChangesMade: false,

            // details about user
            accessToken: null,
            userId: '',
            username: '',
            userProfileDetails: null as {
                userId: string,
                firstName: string,
                lastName: string,
                bio: string,
                profession: string,
                profileImage: string,
                backgroundImage: string,
                githubLink: string,
                personalWebsiteLink: string,
                youtubeLink: string,
                linkedinLink: string,
                xLink: string,
                facebookLink: string,
                instagramLink: string,
                devToLink: string,
                codeWarsLink: string,
                freeCodeCampLink: string,
                mediumLink: string,
                stackoverflowLink: string,
                threadsLink: string
            } | null,

            error: {
                email: "",
                firstName: "",
                lastName: ""
            }
        }
    },
    mounted() {

        // get user dettails from local storage
        const storedUserDetails = localStorage.getItem('DevLinksUserDetails')
        if (storedUserDetails) {
            const user = JSON.parse(storedUserDetails)
            const { access_token, id, username } = user;
            this.accessToken = access_token;
            this.userId = id;
            this.username = username;
        } else {
            // prompt user to sign in again
            console.log("USER SHOULD SIGN IN AGAIN")
        }


    },
    computed: {
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
        username() {
            // send to api
            const apiUrl = process.env.VUE_APP_API_LINK

            fetch(`${apiUrl}/profile/${this.username}`, {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json()).then((response) => {

                // TODO: display this on the mobile screen

                console.log(response)
                const {
                    userId,
                    firstName,
                    lastName,
                    bio,
                    profession,
                    profileImage,
                    backgroundImage,
                    githubLink,
                    personalWebsiteLink,
                    youtubeLink,
                    linkedinLink,
                    xLink,
                    facebookLink,
                    instagramLink,
                    devToLink,
                    codeWarsLink,
                    freeCodeCampLink,
                    mediumLink,
                    stackoverflowLink,
                    threadsLink,
                } = response.profile;
                this.userProfileDetails = {
                    userId,
                    firstName,
                    lastName,
                    bio,
                    profession,
                    profileImage,
                    backgroundImage,
                    githubLink,
                    personalWebsiteLink,
                    youtubeLink,
                    linkedinLink,
                    xLink,
                    facebookLink,
                    instagramLink,
                    devToLink,
                    codeWarsLink,
                    freeCodeCampLink,
                    mediumLink,
                    stackoverflowLink,
                    threadsLink
                };
                this.profileData.firstName = firstName;
                this.profileData.lastName = lastName;
                this.profileData.bio = bio;


                if (profileImage) this.$emit("imagePreview", profileImage);
            }).catch((err) => {
                console.log(err)
            })
        }

    },
    methods: {
        notify() {
            const toast = useToast();
            toast.info(ToastNotification, {
                timeout: 2952,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: false,
                rtl: false
            });
        },
        submitProfile() {

            if (!this.profileImage) return;

            // save image to cloudinary
            this.saveImageToCloudinary(this.profileImage);


        },
        async saveImageToCloudinary(imageFile: File) {
            try {
                const UPLOAD_PRESET = process.env.VUE_APP_UPLOAD_PRESET
                const CLOUD_NAME = process.env.VUE_APP_CLOUD_NAME
                const API_URL = process.env.VUE_APP_API_LINK

                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('upload_preset', UPLOAD_PRESET);
                formData.append('folder', process.env.VUE_APP_CLOUDINARY_IMAGE_FOLDER);

                const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();

                const secure_url = data.secure_url ? data.secure_url : "";

                if (secure_url) {
                    // TODO: save to db
                    this.previewProfileImage = secure_url

                    // send to api
                    const res = await fetch(`${API_URL}/profile`, {
                        method: "PATCH",
                        mode: 'cors',
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${this.accessToken}`
                        },
                        body: JSON.stringify({
                            ...this.userProfileDetails, profileImage: secure_url, firstName: this.profileData.firstName, lastName: this.profileData.lastName, bio: this.profileData.bio
                        }),
                    });

                    const response = await res.json();
                    console.log(response);

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
