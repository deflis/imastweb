<template>
    <div>
        <template v-for="status in statuses">
            <status :status="status"></status>
        </template>
    </div>
</template>

<script lang="ts">
import Vue, { ComponentOptions }  from 'vue'
import status from './status.vue'

export default {
    components: {
        status,
    },
    props: ["statuses"]
} as ComponentOptions<Vue>
</script>
