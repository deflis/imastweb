<template>
<div>
    <button @click="onClick">login</button>  
</div>
</template>

<script lang="ts">
import * as Mastodon from "../api/mastodon"

import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue{
    onClick() {
        location.href = Mastodon.createAuthRedirectUrl();
    }
}
</script>
