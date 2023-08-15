<template>
    <div class="bg-gray-100 rounded-lg p-5 w-full gap-y-3 flex flex-col">
        <div class="flex items-center justify-between">
            <button class="flex items-center justify-start gap-x-2">
                <DragIcon />
                <div class="text-gray-400">Link #{{ link.id }}</div>
            </button>
            <button class="text-gray-400 hover:text-red-700">Remove</button>
        </div>
        <div>
            <span class="block text-sm font-medium leading-6 mb-2 w-full text-left">Platform</span>
            <DropdownButton @selected-option-changed="updatePlatform" :link="link" />
        </div>
        <div>
            <InputField name="link-selector" id="link-selector" type="text" label="Link" :value="linkUrl"
                @input="updateLinkUrl" placeholder="e.g. https://www.github.com/johnappleseed" :default-value="linkUrl" />
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DropdownButton from '@/components/DropdownButton.vue';
import InputField from '@/components/InputField.vue';
import DragIcon from '@/assets/icons/DragIcon.vue';

export default defineComponent({
    name: 'LinkSelector',
    components: {
        DropdownButton,
        InputField,
        DragIcon
    },
    props: {
        link: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            linkUrl: this.link.url,
        }
    },
    methods: {
        updatePlatform(selectedOption: string) {
            this.$emit('updateSelected', selectedOption, this.link.id);
        },
        updateLinkUrl(event: InputEvent) {
            this.linkUrl = (event.target as HTMLInputElement).value;
            this.$emit('setLinkValue', this.linkUrl, this.link.id);
        },
    }
})
</script>