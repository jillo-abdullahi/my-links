<template>
    <div class="bg-white rounded-lg min-h-[720px] flex flex-col justify-between items-center">
        <div class="p-10 w-full">
            <div class="text-left">
                <h1 class="text-4xl font-bold text-gray-700 pb-2">Customize your links</h1>
                <h2 class="text-gray-400 text-base">Add/edit/remove links below and then share all your profiles with the
                    world!
                </h2>
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
import { uuid } from 'vue-uuid';
import ButtonSecondary from "@/components/ButtonSecondary.vue";
import ButtonPrimary from "@/components/ButtonPrimary.vue";
import LinksEmptyStateIcon from "@/assets/icons/LinksEmptyStateIcon.vue";
import LinkSelector from "@/components/LinkSelector.vue";
import { Links, DevLinks, LinkOptions, UserProfileDetails } from "@/types"

export default defineComponent({
    name: "CustomizeLinks",
    components: {
        ButtonPrimary,
        ButtonSecondary,
        LinksEmptyStateIcon,
        LinkSelector
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
            links: {} as Links,
            devLinks: {} as DevLinks,
            linkErrors: [] as string[],

        }


    },
    mounted() {
        if (!this.userProfileDetails) return
        const {
            githubLink,
            personalWebsiteLink,
            youtubeLink,
            devToLink,
            codeWarsLink,
            freeCodeCampLink,
            linkedinLink,
            stackoverflowLink,
            xLink,
            facebookLink,
            CodepenLink,
            HashnodeLink,
            GitlabLink,
            TwitchLink,
            FrontendMentorLink,
        } = this.userProfileDetails

        // construct the links

        interface Link {
            [key: string]: string | undefined,
        }
        const links: Link = {
            [LinkOptions.Github]: githubLink,
            [LinkOptions.PortfolioWebsite]: personalWebsiteLink,
            [LinkOptions.YouTube]: youtubeLink,
            [LinkOptions.Dev_to]: devToLink,
            [LinkOptions.CodeWars]: codeWarsLink,
            [LinkOptions.FreeCodeCamp]: freeCodeCampLink,
            [LinkOptions.LinkedIn]: linkedinLink,
            [LinkOptions.StackOverFlow]: stackoverflowLink,
            [LinkOptions.Twitter]: xLink,
            [LinkOptions.Facebook]: facebookLink,
            [LinkOptions.Codepen]: CodepenLink,
            [LinkOptions.Hashnode]: HashnodeLink,
            [LinkOptions.Gitlab]: GitlabLink,
            [LinkOptions.Twitch]: TwitchLink,
            [LinkOptions.Frontend_Mentor]: FrontendMentorLink,
        }

        Object.keys(links).forEach((key, index) => {
            const url = links[key]

            if (url) {
                const linkOption = {
                    platform: key,
                    url,
                    id: index.toString(),
                    error: ""
                }
                this.links[key] = linkOption
            }

        })

    },
    watch: {
        links: {
            handler() {
                console.log('this is the links array', this.links) // TODO remove this

                // create links object to send to the server
                Object.values(this.links).forEach((link) => {
                    this.devLinks[link.platform] = { url: link.url }
                })

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
                platform: LinkOptions.PortfolioWebsite,
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
            this.links[linkId].error = ""
        },
        removeLink(linkId: number): void {
            delete this.links[linkId];
        },

        validateLink(linkId: string) {
            const link = this.links[linkId];

            // check if link is empty
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

            this.linkErrors = []



        },
        submitLinks(): void {
            console.log('submitting links', this.links)

            //validate links
            Object.keys(this.links).forEach(linkId => {
                this.validateLink(linkId);
            })

            // return if there's any link with an error.
            if (this.linkErrors.length) return

            const linksObject = this.devLinks;
            const links = {
                githubLink: linksObject[LinkOptions.Github]?.url ?? "",
                personalWebsiteLink: linksObject[LinkOptions.PortfolioWebsite]?.url ?? "",
                youtubeLink: linksObject[LinkOptions.YouTube]?.url ?? "",
                devToLink: linksObject[LinkOptions.Dev_to]?.url ?? "",
                codeWarsLink: linksObject[LinkOptions.CodeWars]?.url ?? "",
                freeCodeCampLink: linksObject[LinkOptions.FreeCodeCamp]?.url ?? "",
                linkedinLink: linksObject[LinkOptions.LinkedIn]?.url ?? "",
                stackoverflowLink: linksObject[LinkOptions.StackOverFlow]?.url ?? "",
                xLink: linksObject[LinkOptions.Twitter]?.url ?? "",
                facebookLink: linksObject[LinkOptions.Facebook]?.url ?? "",
                CodepenLink: linksObject[LinkOptions.Codepen]?.url ?? "",
                HashnodeLink: linksObject[LinkOptions.Hashnode]?.url ?? "",
                GitlabLink: linksObject[LinkOptions.Gitlab]?.url ?? "",
                TwitchLink: linksObject[LinkOptions.Twitch]?.url ?? "",
                FrontendMentorLink: linksObject[LinkOptions.Frontend_Mentor]?.url ?? ""
            }

            console.log({ linksToSENDTOAPI: links })

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
                    ...this.userProfileDetails, ...links
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