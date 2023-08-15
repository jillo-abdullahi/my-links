<template>
    <div class="-mt-12">
        <div class="p-6">
            <NavBar @change-tabs="setActiveTab" :tabs="tabs" />
            <div class="pt-6 grid grid-cols-12 gap-x-6">
                <div class="col-span-5">
                    <MobilePreview />
                </div>
                <div class="col-span-7">
                    <div v-if="profileTabActive">
                        <ProfileDetails />
                    </div>
                    <div v-else-if="linksTabActive">
                        <CustomizeLinks />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "./NavBar.vue";
import MobilePreview from "./MobilePreview.vue";
import CustomizeLinks from "./CustomizeLinks.vue";
import ProfileDetails from "./ProfileDetails.vue";

export default defineComponent({
    name: "ProfileView",
    data() {
        return {
            tabs: [
                { name: 'Links', current: true },
                { name: 'Profile', current: false },
            ] as { name: string, current: boolean }[]
        }
    },
    components: {
        NavBar,
        MobilePreview,
        CustomizeLinks,
        ProfileDetails
    },
    computed: {
        linksTabActive(): boolean {
            return this.tabs[0].current === true;
        },
        profileTabActive(): boolean {
            return this.tabs[1].current === true;
        }
    },
    methods: {
        setActiveTab(tabIndex: number) {
            this.tabs.forEach((tab, index) => {
                if (index === tabIndex) {
                    tab.current = true;
                } else {
                    tab.current = false;
                }
            })
        }
    },
});
</script>