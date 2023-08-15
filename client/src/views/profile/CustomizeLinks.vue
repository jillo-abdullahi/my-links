<template>
    <div class="bg-white rounded-lg p-10 w-full min-h-[720px]">
        <div class="text-left">
            <h1 class="text-4xl font-bold text-gray-700 pb-2">Customize your links</h1>
            <h2 class="text-gray-400 text-base">Add/edit/remove links below and then share all your profiles with the world!
            </h2>
        </div>
        <div class="w-full mt-10">
            <ButtonSecondary text="+ Add new link" :is-inside-nav="false" @button-clicked="addNewLink" />
        </div>
        <div v-if="links.length < 1" class="mt-10 rounded-lg bg-gray-100 flex flex-col items-center justify-center py-10">
            <LinksEmptyStateIcon />

            <div class="mt-10 text-3xl font-bold text-gray-700">
                Let’s get you started
            </div>
            <div class="text-base text-gray-400 pt-6 w-full max-w-lg">
                Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit
                them. We’re here to help you share your profiles with everyone!
            </div>
        </div>
        <div v-else class="mt-10 w-full" v-for="(link, index) in links" :key="index">
            <LinkSelector @update-selected="setLinkPlatform" @set-link-value="setLinkUrl" :link="link" />
        </div>




    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonSecondary from "@/components/ButtonSecondary.vue";
import LinksEmptyStateIcon from "@/assets/icons/LinksEmptyStateIcon.vue";
import LinkSelector from "@/components/LinkSelector.vue";

export default defineComponent({
    name: "CustomizeLinks",
    components: {
        ButtonSecondary,
        LinksEmptyStateIcon,
        LinkSelector
    },
    data() {
        console.log('this is the links array', this.links)

        return {
            links: [{
                id: 1,
                platform: "Github",
                url: "https://vuejs.org/guide/components/events.html#event-arguments",
            },
            ] as { id: number, platform: string, url: string }[]
        }


    },
    watch: {
        links: {
            handler() {
                console.log('this is the links array', this.links)
            },
            deep: true
        }
    },
    methods: {
        addNewLink(): void {
            this.links.push({
                id: this.links.length + 1,
                platform: "",
                url: "",

            });
        },
        setLinkPlatform(selectedOption: string, linkId: number): void {
            // update link platform
            // subtract 1 from linkId because we're using array length as the id
            this.links[linkId - 1].platform = selectedOption;
        },
        setLinkUrl(value: string, linkId: number): void {
            this.links[linkId - 1].url = value;
        }
    }
});
</script>