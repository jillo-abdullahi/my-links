<template>
    <div class="bg-gray-100 rounded-lg p-5 w-full gap-y-3 flex flex-col cursor-pointer">
        <div class="flex items-center justify-between">
            <button class="flex items-center justify-start gap-x-2">
                <DragIcon />
                <div class="text-gray-400">Link #{{ linkIndex + 1 }}</div>
            </button>
            <button class="text-gray-400 hover:text-red-700" @click="removeLink">Remove</button>
        </div>
        <div>
            <span class="block text-sm font-medium leading-6 mb-2 w-full text-left">Platform</span>
            <DropdownButton @selected-option-changed="updatePlatform" :link="link" />
        </div>
        <div>
            <InputField name="link-selector" id="link-selector" type="text" label="Link" :value="linkUrl"
                @input="updateLinkUrl" placeholder="e.g. https://www.github.com/johnappleseed" :default-value="linkUrl"
                :error="link.error" />
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DropdownButton from '@/components/DropdownButton.vue';
import InputField from '@/components/InputField.vue';
import DragIcon from '@/assets/icons/DragIcon.vue';
import { Link } from "@/types"

export default defineComponent({
    name: 'LinkSelector',
    components: {
        DropdownButton,
        InputField,
        DragIcon
    },
    props: {
        link: {
            type: Object as PropType<Link>,
            required: true
        },
        links: {
            type: Object as PropType<Link[]>,
            required: true
        },
        linkIndex: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            linkUrl: this.link.url,
        }
    },
    computed: {

    },
    methods: {
        updatePlatform(selectedOption: string) {
            this.$emit('updateSelected', selectedOption, this.linkIndex);
        },
        updateLinkUrl(event: InputEvent) {
            this.linkUrl = (event.target as HTMLInputElement).value;
            this.$emit('setLinkValue', this.linkUrl, this.linkIndex);
        },
        removeLink() {
            this.$emit('removeLink', this.link.id);
        }
    }
})
</script>