<template>
    <Menu as="div" class="relative inline-block text-left w-full">
        <div>
            <MenuButton
                class="dropdown inline-flex w-full justify-between rounded-md bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 "
                @click="toggleDropdown">
                <div class="flex items-center justify-center gap-x-2">
                    <component :is="linkIcon" class="h-4 w-4 text-gray-400 group-hover:fill-purple-700" aria-hidden="true"
                        fill="#737373">
                    </component>
                    <div class="font-normal">{{ linkPlatform }}</div>
                </div>

                <div>
                    <div v-if="!showDropdown">
                        <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <div v-else-if="showDropdown">
                        <ChevronUpIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                </div>


            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95"
            v-show="showDropdown">
            <MenuItems
                class="w-full absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1 w-full" v-for="(item, index) in dropDownItems" :key="index">
                    <MenuItem>
                    <button class="group flex items-center px-4 py-2 text-sm w-full" @click="setSelectedOption(index)">
                        <component :is="item.icon"
                            class="mr-3 h-5 w-5 text-gray-400 fill-gray-500 group-hover:fill-purple-700" aria-hidden="true">
                        </component>
                        <div class="group-hover:text-purple-700">{{ item.name }}</div>
                    </button>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import {
    ChevronDownIcon,
    ChevronUpIcon,
    LinkIcon
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
    name: 'DropdownButton',
    components: {
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        ChevronDownIcon,
        ChevronUpIcon,
        LinkIcon,
    },
    props: {
        link: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showDropdown: false,
            selectedOptionIndex: 0,
            dropDownItems: [
                {
                    name: 'Github',
                    icon: GithubIcon,
                },
                {
                    name: 'Codepen',
                    icon: CodePenIcon,
                },
                {
                    name: 'Twitter',
                    icon: TwitterIcon,
                },
                {
                    name: 'YouTube',
                    icon: YouTubeIcon,

                },
                {
                    name: 'Facebook',
                    icon: FacebookIcon,
                },
                {
                    name: 'Dev.to',
                    icon: DevToIcon,
                },
                {
                    name: 'LinkedIn',
                    icon: LinkedInIcon,
                },
                {
                    name: 'FreeCodeCamp',
                    icon: FreeCodeCampIcon,
                },
                {
                    name: 'Hashnode',
                    icon: HashnodeIcon,
                },
                {
                    name: 'Gitlab',
                    icon: GitlabIcon,
                },
                {
                    name: 'Twitch',
                    icon: TwitchIcon,
                },
                {
                    name: 'Frontend Mentor',
                    icon: FrontendMentorIcon,
                },
                {
                    name: 'CodeWars',
                    icon: CodeWarsIcon,
                },
                {
                    name: 'StackOverFlow',
                    icon: StackOverFlowIcon,

                }

            ],
        }
    },
    watch: {
        selectedOptionIndex() {
            this.$emit('selected-option-changed', this.dropDownItems[this.selectedOptionIndex].name)
        }
    },
    computed: {
        // set link icon based on link prop
        linkIcon() {
            switch (this.link.platform) {
                case 'Github':
                    return GithubIcon
                case 'Codepen':
                    return CodePenIcon
                case 'Twitter':
                    return TwitterIcon
                case 'YouTube':
                    return YouTubeIcon
                case 'Facebook':
                    return FacebookIcon
                case 'Dev.to':
                    return DevToIcon
                case 'LinkedIn':
                    return LinkedInIcon
                case 'FreeCodeCamp':
                    return FreeCodeCampIcon
                case 'Hashnode':
                    return HashnodeIcon
                case 'Gitlab':
                    return GitlabIcon
                case 'Twitch':
                    return TwitchIcon
                case 'Frontend Mentor':
                    return FrontendMentorIcon
                case 'CodeWars':
                    return CodeWarsIcon
                case 'StackOverFlow':
                    return StackOverFlowIcon
                default:
                    return GithubIcon
            }
        },
        linkPlatform() {
            if (this.link.platform) return this.link.platform
            return 'Github'
        }
    },
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown
        },
        setSelectedOption(index: number) {
            this.selectedOptionIndex = index

            // close dropdown
            this.showDropdown = false
        }
    }

})
</script>

<style scoped>
button.dropdown {
    border-radius: 0.5rem;
    border: 1px solid var(--purple, #633CFF);
    background: var(--white, #FFF);
}

button.dropdown:active,
button.dropdown:hover {
    box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
}
</style>