<template>
    <div
        class="shadow-md shadow-purple-700 rounded-xl py-12 px-14 flex flex-col gap-y-14 bg-white">
        <div class="flex flex-col">
            <div class="flex flex-col justify-center items-center gap-y-6">
                <div class="bg-gray-300 w-24 h-24 rounded-full border-4 border-purple-700" :style="{
                    backgroundImage: `url(${profileImage})`,
                    backgroundOrigin: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }"></div>
                <h1 class="text-3xl font-bold text-gray-900">Jillo Woche</h1>
            </div>
            <p class="text-gray-400 font-light">jayloabdullahi@gmail.com</p>
        </div>

        <div class="flex flex-col gap-3">
            <a class="cursor-pointer w-60 rounded-lg p-4 flex items-center justify-between hover:bg-opacity-90"
                :class="getLinkStyles(link.name).styles" v-for="(link, index) in links" :key="index" :href="link.url"
                target="_blank">
                <div class="flex gap-2 items-center">
                    <component :is="getLinkStyles(link.name).icon" class="h-6 w-6 text-white fill-white" aria-hidden="true"
                        v-bind="getLinkStyles(link.name).props">
                    </component>
                    <div>{{ link.name }}</div>
                </div>
                <ArrowRightIcon class="w-4 h-4 text-white" />
            </a>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, defineComponent } from 'vue';
import {
    ArrowRightIcon,
} from '@heroicons/vue/20/solid'
import GithubIcon from '@/assets/brandIcons/GithubIcon.vue'
import CodePenIcon from '@/assets/brandIcons/CodePenIcon.vue'
import TwitterIcon from '@/assets/brandIcons/TwitterIcon.vue'
import YouTubeIcon from '@/assets/brandIcons/YouTubeIcon.vue'
import FacebookIcon from '@/assets/brandIcons/FacebookIcon.vue'
import DevToIcon from '@/assets/brandIcons/DevToIcon.vue'
import LinkedInIcon from '@/assets/brandIcons/LinkedInIcon.vue'
import FreeCodeCampIcon from '@/assets/brandIcons/FreeCodeCampIcon.vue'
import HashnodeIcon from '@/assets/brandIcons/HashnodeIcon.vue'
import GitlabIcon from '@/assets/brandIcons/GitlabIcon.vue'
import TwitchIcon from '@/assets/brandIcons/TwitchIcon.vue'
import FrontendMentorIcon from '@/assets/brandIcons/FrontendMentorIcon.vue'
import CodeWarsIcon from '@/assets/brandIcons/CodeWarsIcon.vue'
import StackOverFlowIcon from '@/assets/brandIcons/StackOverFlowIcon.vue'

export default defineComponent({
    name: 'ProfileLinks',
    components: {
        ArrowRightIcon
    },
    data() {
        return {
            profileImage: 'https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg',

            // TODO: links below should be fetched from API
            links: [
                {
                    name: "Github",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "Twitter",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "Facebook",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "LinkedIn",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "Dev.to",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "Hashnode",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "Gitlab",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "Twitch",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "Frontend Mentor",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "CodeWars",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
                {
                    name: "StackOverFlow",
                    url: "https://res.cloudinary.com/dsuhsqcb2/image/upload/v1692357018/zg2egmlqwm3mifkny4ke.jpg",
                },
            ]
        }
    },
    methods: {
        getLinkStyles(linkName: string): { icon: Component, styles: string, props?: { [key: string]: string } } {
            switch (linkName) {
                case "Github":
                    return { styles: "bg-[#1A1A1A] text-white", icon: GithubIcon }
                case "Twitter":
                    return { styles: "bg-[#43B7E9] text-white", icon: TwitterIcon }
                case "Facebook":
                    return { styles: "bg-[#2442AC] text-white", icon: FacebookIcon }
                case "LinkedIn":
                    return { styles: "bg-[#2D68FF] text-white", icon: LinkedInIcon }
                case "Dev.to":
                    return { styles: "bg-[#333333] text-white", icon: DevToIcon, props: { innerFill: "#000000" } }
                case "Hashnode":
                    return { styles: "bg-[#0330D1] text-white", icon: HashnodeIcon }
                case "Gitlab":
                    return { styles: "bg-[#EB4925] text-white", icon: GitlabIcon }
                case "Twitch":
                    return { styles: "bg-[#EE3FC8] text-white", icon: TwitchIcon }
                case "Frontend Mentor":
                    return { styles: "bg-white border border-gray-200 text-gray-700", icon: FrontendMentorIcon, props: { fill: "#000000" } }
                case "CodeWars":
                    return { styles: "bg-[#8A1A50] text-white", icon: CodeWarsIcon }
                case "StackOverFlow":
                    return { styles: "bg-[#EC7100] text-white", icon: StackOverFlowIcon }
                case "Youtube":
                    return { styles: "bg-[#EE3939] text-white", icon: YouTubeIcon }
                case "Codepen":
                    return { styles: "bg-[#1D1E22] text-white", icon: CodePenIcon }
                case "FreeCodeCamp":
                    return { styles: "bg-[#302267] text-white", icon: FreeCodeCampIcon }

                default:
                    return { styles: "bg-black", icon: GithubIcon }
            }
        }

    }
})
</script>