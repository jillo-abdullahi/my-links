<template>
    <div class="rounded-lg p-4 flex items-center w-full  bg-white">
        <div class="w-1/3 flex items-center justify-start">
            <LogoImage :is-inside-nav="true" />
        </div>
        <nav class="flex space-x-4 w-1/3 items-center justify-center" aria-label="Tabs">
            <button v-for="tab in tabs" :key="tab.name"
                :class="[tab.current ? 'bg-purple-100 text-purple-700' : 'text-gray-500 hover:text-purple-700', 'flex items-center justify-center rounded-md px-3 md:px-5 py-2 text-sm font-bold group shrink-0']"
                :aria-current="tab.current ? 'page' : undefined">

                <LinkIcon v-if="tab.name === 'Links'" class="fill-gray-500 w-5 h-5"
                    :class="{ 'fill-purple-700': tab.current, 'group-hover:fill-purple-700': !tab.current }" />

                <UserCircleIcon class="fill-gray-500 w-5 h-5"
                    :class="{ 'fill-purple-700': tab.current, 'group-hover:fill-purple-700': !tab.current }" v-else />

                <div class="hidden md:block pl-2">{{ tab.name }}</div>
            </button>
        </nav>


        <div class="w-1/3 h-full flex items-center justify-end">
            <ButtonSecondary text="Preview" :is-inside-nav="true" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LogoImage from "../../components/LogoImage.vue";
import ButtonSecondary from "../../components/ButtonSecondary.vue";
import {
    LinkIcon,
    UserCircleIcon
} from '@heroicons/vue/20/solid'

export default defineComponent({
    name: "NavBar",
    components: {
        LogoImage,
        ButtonSecondary,
        LinkIcon,
        UserCircleIcon

    },
    data() {
        return {
            tabs: [
                { name: 'Links', current: true },
                { name: 'Profile Details', current: false},
            ]
        }
    }
});
</script>