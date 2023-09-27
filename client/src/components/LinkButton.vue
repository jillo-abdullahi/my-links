<template>
    <span class="isolate inline-flex rounded-md shadow-sm" :class="width">
        <a type="button" :href="link.url"
            class="relative inline-flex items-center gap-x-1.5 rounded-l-md px-5 py-4 text-sm font-semibold w-3/4"
            :class="getLinkStyles(link.platform).styles" target="_blank">
            <div class="flex gap-2 items-center">
                <component :is="getLinkStyles(link.platform).icon" class="h-6 w-6 text-white fill-white" aria-hidden="true"
                    v-bind="getLinkStyles(link.platform).props">
                </component>
                <div>{{ link.platform }}</div>
            </div>
        </a>
        <button type="button"
            class="w-1/4 bg-opacity-90 hover:bg-opacity-95 relative -ml-px inline-flex items-center justify-center rounded-r-md px-3 py-4 text-xs font-semibold"
            :class="getLinkStyles(link.platform).styles" @click="copyToClipboard(link.url)"><span>{{ copyText
            }}</span></button>
    </span>
</template>
  
<script lang="ts">
import { defineComponent, PropType, Component } from 'vue';
import { LinkOptions, Link } from '@/types';

// Link icons
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
import PortfolioIcon from '@/assets/brandIcons/PortfolioIcon.vue';


export default defineComponent({
    data() {
        return {
            copyText: 'Copy',
        }
    },
    props: {
        link: {
            type: Object as PropType<Link>,
            required: true
        },
        width: {
            type: String,
            default: 'w-72'
        }
    },
    methods: {
        async copyToClipboard(mytext: string) {
            try {
                await navigator.clipboard.writeText(mytext);
                this.copyText = 'Copied';
                this.resetCopyText()
            } catch (err) {
                this.copyText = 'Failed';
                this.resetCopyText()
            }
        },
        resetCopyText() {
            setTimeout(() => {
                this.copyText = 'Copy';
            }, 1000);
        },
        getLinkStyles(linkPlatform: string): { icon: Component, styles: string, props?: { [key: string]: string } } {
            switch (linkPlatform) {
                case LinkOptions.Github:
                    return { styles: "bg-[#1A1A1A] text-white", icon: GithubIcon }
                case LinkOptions.Twitter:
                    return { styles: "bg-[#43B7E9] text-white", icon: TwitterIcon }
                case LinkOptions.Facebook:
                    return { styles: "bg-[#2442AC] text-white", icon: FacebookIcon }
                case LinkOptions.LinkedIn:
                    return { styles: "bg-[#2D68FF] text-white", icon: LinkedInIcon }
                case LinkOptions.Dev_to:
                    return { styles: "bg-[#333333] text-white", icon: DevToIcon, props: { innerFill: "#000000" } }
                case LinkOptions.Hashnode:
                    return { styles: "bg-[#0330D1] text-white", icon: HashnodeIcon }
                case LinkOptions.Gitlab:
                    return { styles: "bg-[#EB4925] text-white", icon: GitlabIcon }
                case LinkOptions.Twitch:
                    return { styles: "bg-[#EE3FC8] text-white", icon: TwitchIcon }
                case LinkOptions.Frontend_Mentor:
                    return { styles: "bg-[#6ABECD] text-gray-700", icon: FrontendMentorIcon, props: { fill: "#000000" } }
                case LinkOptions.CodeWars:
                    return { styles: "bg-[#8A1A50] text-white", icon: CodeWarsIcon }
                case LinkOptions.StackOverFlow:
                    return { styles: "bg-[#EC7100] text-white", icon: StackOverFlowIcon }
                case LinkOptions.YouTube:
                    return { styles: "bg-[#EE3939] text-white", icon: YouTubeIcon }
                case LinkOptions.Codepen:
                    return { styles: "bg-[#444857] text-white", icon: CodePenIcon }
                case LinkOptions.FreeCodeCamp:
                    return { styles: "bg-[#302267] text-white", icon: FreeCodeCampIcon }
                case LinkOptions.PortfolioWebsite:
                    return { styles: "bg-gray-100 border border-gray-200 text-gray-800", icon: PortfolioIcon, props: { fill: "#808080" } }
                default:
                    return { styles: "bg-black", icon: GithubIcon }
            }
        }

    }
});

</script>