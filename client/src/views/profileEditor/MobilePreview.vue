<template>
    <div class="sticky top-6">
        <div class="relative p-10 bg-white rounded-lg flex items-center justify-center h-[720px] ">
            <div class="h-[632px] w-[344px] relative z-50 border-2 border-gray-400 p-2 rounded-[44px]">
                <!-- notch - sorry Android folks ;-)  -->
                <div class="absolute top-6 inset-x-0 mx-auto h-9 w-28 rounded-full bg-black z-20"></div>

                <div
                    class="mx-auto my-auto z-10 m-10 border-2 border-gray-400 overflow-scroll no-scrollbar h-full w-full rounded-[36px]">
                    <div class="flex flex-col items-center justify-center space-y-4 pt-16">
                        <div class="bg-gray-300 w-24 h-24 rounded-full" :style="{
                            backgroundImage: `url(${profileImagePreview})`,
                            backgroundOrigin: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }"></div>
                        <div class="flex flex-col items-center justify-center space-y-1">

                            <!-- full name  -->
                            <div v-if="fullName" class="text-gray-800 font-bold">{{ fullName }}</div>
                            <div class="bg-gray-300 w-40 h-4 rounded-full" v-else></div>

                            <!-- profession  -->
                            <div v-if="profession" class="text-gray-900 text-sm max-w-[200px] line-clamp-3">{{
                                profession }}
                            </div>
                            <div class="bg-gray-300 w-28 h-2 rounded-full" v-else></div>
                        </div>
                        <!-- developer links  -->
                        <div v-if="devLinks.length">
                            <div class="flex flex-col">
                                <div class="cursor-pointer rounded-lg p-4 flex items-center justify-between hover:bg-opacity-90"
                                    v-for="(link, index) in devLinks" :key="index" :href="link.url">
                                    <LinkButton :link="link" :width="`w-64`" />
                                </div>
                            </div>
                        </div>
                        <!-- empty state for links  -->
                        <div class="flex flex-col items-center justify-center space-y-4" v-else>
                            <div class="bg-gray-300 w-60 rounded-lg h-11"></div>
                            <div class="bg-gray-300 w-60 rounded-lg h-11"></div>
                            <div class="bg-gray-300 w-60 rounded-lg h-11"></div>
                            <div class="bg-gray-300 w-60 rounded-lg h-11"></div>
                            <div class="bg-gray-300 w-60 rounded-lg h-11"></div>
                        </div>

                    </div>
                </div>

            </div>





        </div>

    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from "vue";
import { Links } from "@/types"
import LinkButton from "@/components/LinkButton.vue";

export default defineComponent({
    name: "MobilePreview",
    components: {
        LinkButton
    },
    data() {
        return {
            logoImagePath: require("@/assets/logo.svg"),
            devLinks: this.links
        }
    },
    props: {
        profileImagePreview: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            required: true,
            default: ''
        },
        profession: {
            type: String,
            required: true,
            default: ''
        },
        fullName: {
            type: String,
            required: true,
            default: ''
        },
        links: {
            type: Array as PropType<Links>,
            required: true,
            default: () => []
        }
    },

    watch: {
        links: {
            handler(links) {
                this.devLinks = links
            },
            immediate: true,
            deep: true
        },
    }
});
</script>
