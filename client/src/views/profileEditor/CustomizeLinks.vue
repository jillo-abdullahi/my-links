<template>
    <div class="bg-white rounded-lg min-h-[720px] flex flex-col justify-between items-center">
        <div class="p-10 w-full">
            <div class="text-left">
                <h1 class="text-4xl font-bold text-gray-700 pb-2">Customize your links</h1>
                <h2 class="text-gray-400 text-base">Add/edit/remove links below and then share all your profiles with the
                    world!
                </h2>
            </div>
            <div class="w-full mt-10">
                <ButtonSecondary text="+ Add new link" :is-inside-nav="false" @button-clicked="addNewLink" />
            </div>
            <div v-if="linksEmpty" class="mt-10 rounded-lg bg-gray-100 flex flex-col items-center justify-center py-10">
                <LinksEmptyStateIcon />

                <div class="mt-10 text-3xl font-bold text-gray-700">
                    Let’s get you started
                </div>
                <div class="text-base text-gray-400 pt-6 w-full max-w-lg">
                    Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit
                    them. We’re here to help you share your profiles with everyone!
                </div>
            </div>
            <div v-else class="mt-10 w-full" v-for="(link, key, index) in links" :key="key">
                <LinkSelector @update-selected="setLinkPlatform" @set-link-value="setLinkUrl" @remove-link="removeLink"
                    :link="link" :links="links" :linkIndex="index + 1" />
            </div>
        </div>
        <div class="mt-10 w-full flex items-center justify-end p-6 border-t border-gray-200" v-if="!linksEmpty">
            <div class="w-fit-content">
                <ButtonPrimary text="Save" :is-inside-nav="false" @button-clicked="submitLinks" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { uuid } from 'vue-uuid';
import ButtonSecondary from "@/components/ButtonSecondary.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import LinksEmptyStateIcon from "@/assets/icons/LinksEmptyStateIcon.vue";
import LinkSelector from "@/components/LinkSelector.vue";

export default defineComponent({
    name: "CustomizeLinks",
    components: {
        ButtonPrimary,
        ButtonSecondary,
        LinksEmptyStateIcon,
        LinkSelector
    },
    data() {
        return {
            links: {
                ["sdfsdfsdfsdf"]: {
                    platform: "Github",
                    url: "https://vuejs.org/guide/components/events.html#event-arguments",
                    id: "sdfsdfsdfsdf"
                }
            } as {
                [key: string]: {
                    platform: string,
                    url: string,
                    id: string,
                    error?: string
                }
            }

        }


    },
    watch: {
        links: {
            handler() {
                console.log('this is the links array', this.links) // TODO remove this
            },
            deep: true
        }
    },
    computed: {
        linksEmpty(): boolean {
            return Object.keys(this.links).length === 0;
        }
    },
    methods: {
        addNewLink(): void {
            const linkId = uuid.v4();
            this.links[linkId] = {
                platform: "Github",
                url: "",
                error: "",
                id: linkId
            };
        },
        setLinkPlatform(selectedOption: string, linkId: number): void {
            // update this link's platform
            this.links[linkId].platform = selectedOption;
        },
        setLinkUrl(value: string, linkId: string): void {
            // update the url of the current link 
            this.links[linkId].url = value;
        },
        removeLink(linkId: number): void {
            delete this.links[linkId];
        },

        validateLink(linkId: string) {
            const link = this.links[linkId];

            // check if link is empty
            if (link.url === "") {
                link.error = "Link can't be empty";
                return
            }
            // check if link is valid
            try {
                new URL(link.url);
            } catch (error) {
                link.error = "Invalid URL";
                return
            }

            link.error = ""
        },
        submitLinks(): void {
            console.log('submitting links', this.links)

            //validate links
            Object.keys(this.links).forEach(linkId => {
                this.validateLink(linkId);
            })

        }
    }
});
</script>