<template>
<div>
    Logged in
</div>
</template>

<script lang="ts">

import * as Mastodon from "../api/mastodon"
import Config, { save as saveConfig } from "../api/config";
import { Component, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class LoginCallback extends Vue{
    created() {
        console.log("created");
        this.token();
    }
    mounted(){
        this.$router.push("/home");
    }

    async token() {
        Config.token = await Mastodon.getToken(this.$route.query["code"]);
        saveConfig();
        Mastodon.setToken(Config.token.access_token);
    }
}
</script>
