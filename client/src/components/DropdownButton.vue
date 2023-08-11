<template>
    <Menu as="div" class="relative inline-block text-left">
        <div>
            <MenuButton
                class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                @click="toggleDropdown">
                Options
                <ChevronDownIcon class="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95"
            v-show="showDropdown">
            <MenuItems
                class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1" v-for="(item, index) in dropDownItems" :key="index">
                    <MenuItem>
                    <button :class="['group flex items-center px-4 py-2 text-sm']">
                        <component :is="item.icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:fill-purple-700"
                            aria-hidden="true" fill="#737373"></component>
                        {{ item.name }}
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

    },

    data() {
        return {
            showDropdown: false,
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
    methods: {
        toggleDropdown() {
            this.showDropdown = !this.showDropdown
        }
    }

})


</script>