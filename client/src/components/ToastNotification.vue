<template>
    <div class="flex items-center justify-center rounded-lg p-5 gap-y-3"
        :class="{ 'bg-gray-700': isSuccess, 'bg-red-700': !isSuccess }">
        <div>
            <div v-if="isSuccess">
                <SavedIcon />
            </div>
            <div v-else>
                <ExclamationCircleIcon />div>
            </div>
            <div class="text-white">
                {{ text }}
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SavedIcon from "@/assets/icons/SavedIcon.vue"
import {
    ExclamationCircleIcon
} from '@heroicons/vue/20/solid'
export default defineComponent({
    name: "ToastNotification",
    props: {
        text: {
            type: String,
            required: true
        },
        isSuccess: {
            type: Boolean,
            default: true
        }
    },
    components: { SavedIcon, ExclamationCircleIcon }
})

</script>