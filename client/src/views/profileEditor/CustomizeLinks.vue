<template>
    <div class="bg-white rounded-lg min-h-[720px] flex flex-col justify-between items-center">
        <div class="p-10 w-full">
            <div class="text-left">
                <h1 class="text-4xl font-bold text-gray-700 pb-2">Customize your links</h1>
                <h2 class="text-gray-400 text-base">Add, edit, remove or reorder links below 
                </h2>
            </div>

            <div v-if="linksEmpty" class="mt-10 rounded-lg bg-gray-100 flex flex-col items-center justify-center py-10">
                <LinksEmptyStateIcon />
                <div class="mt-10 text-3xl font-bold text-gray-700">
                    Let’s get you started
                </div>
                <div class="text-base text-gray-400 pt-6 w-full max-w-lg">
                    Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit
                    them.
                </div>
            </div>
            <div v-else>
                <draggable v-model="links" :disabled="false" @start="dragging = true" @end="dragging = false" item-key="id">
                    <template #item="{ element, index }">
                        <div class="mt-10 w-full">
                            <LinkSelector @update-selected="setLinkPlatform" @set-link-value="setLinkUrl"
                                @remove-link="removeLink" :link="element" :links="links" :linkIndex="index" />
                        </div>

                    </template>

                </draggable>
            </div>
            <div class="w-full mt-10">
                <ButtonSecondary text="+ Add new link" :is-inside-nav="false" @button-clicked="addNewLink" />
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
import { defineComponent, PropType } from "vue";
import { uuid } from "vue-uuid";
import draggable from "vuedraggable"
import ButtonSecondary from "@/components/ButtonSecondary.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import LinksEmptyStateIcon from "@/assets/icons/LinksEmptyStateIcon.vue";
import LinkSelector from "@/components/LinkSelector.vue";
import { Links, LinkOptions, UserProfileDetails, Link } from "@/types"

export default defineComponent({
    name: "CustomizeLinks",
    components: {
        ButtonPrimary,
        ButtonSecondary,
        LinksEmptyStateIcon,
        LinkSelector,
        draggable
    },
    props: {
        accessToken: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        userProfileDetails: {
            type: Object as PropType<UserProfileDetails | null>,
            required: true
        },
    },

    data() {
        return {
            links: [] as Links,
            linkErrors: [] as string[],
            dragging: false

        }


    },
    watch: {
        // craft links object once user profile details is available
        // thought having this on mount() would suffice.
        userProfileDetails() {
            if (this.userProfileDetails) {
                this.getUserLinks(this.userProfileDetails)
            }
        },

        links: {
            handler(links) {
                //TODO: Revisit this
                this.links = links;
            },
            deep: true,
            immediate: true

        }
    },
    computed: {
        linksEmpty(): boolean {
            return this.links.length === 0;
        }
    },
    mounted() {
        // craft links object on mount
        // Not sure why this is necessary
        if (this.userProfileDetails) {
            this.getUserLinks(this.userProfileDetails)
        }
    },
    methods: {
        /**
         * Returns link object that can be displayed in the links component
         * @param profileDetails - the profile details for the user
         */
        getUserLinks(profileDetails: UserProfileDetails) {
            if (!profileDetails) return
            const {
                links
            } = profileDetails
            this.links = links.length ? links : [];
        },
        addNewLink(): void {
            const id = uuid.v4()
            this.links.push({
                platform: LinkOptions.PortfolioWebsite,
                url: "",
                error: "",
                id
            });
        },
        setLinkPlatform(selectedOption: LinkOptions, linkId: number): void {
            // update this link's platform
            this.links[linkId].platform = selectedOption;
        },
        setLinkUrl(value: string, linkId: number): void {
            // update the url of the current link 
            this.links[linkId].url = value;
            this.links[linkId].error = ""
        },
        removeLink(linkId: string): void {
            this.links = this.links.filter(link => link.id !== linkId);
        },

        validateLink(link: Link) {
            // check if link url is empty
            if (link.url === "") {
                const error = "Link can't be empty"
                link.error = error;
                this.linkErrors.push(error)
                return
            }

            // check if link is valid
            try {
                new URL(link.url);
            } catch (error) {
                const errorMessage = "Invalid URL"
                link.error = errorMessage;
                this.linkErrors.push(errorMessage)
                return

            }

        },
        submitLinks(): void {
            // validate links
            this.linkErrors = [];
            this.links.forEach(link => {
                this.validateLink(link);
            })

            // return if there's any link with an error.
            if (this.linkErrors.length) return


            // api call to submit links
            const API_URL = process.env.VUE_APP_API_LINK;
            fetch(`${API_URL}/profile`, {
                method: "PATCH",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.accessToken}`
                },
                body: JSON.stringify({
                    ...this.userProfileDetails, links: this.links
                }),
            }).then(res => res.json()).then((response) => {
                console.log({ "LINKS RESP": response })
            }).catch((err) => {
                console.log({ "ERROR UPDATING LINKS": err })
            })

        }
    }
});
</script>