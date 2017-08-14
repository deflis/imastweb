import { Component, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator'

import config, { Config } from "./api/config"
import Mastodon, { Account } from "./api/mastodon"
import store, { MutationTypes } from "./store"


import HomeTimeline from "./components/home_timeline.vue";
import LocalTimeline from "./components/local_timeline.vue";
import DummyTimeline from "./components/dummy_timeline.vue";


@Component({
    components: {
        HomeTimeline,
        LocalTimeline,
    }
})
export default class App extends Vue {
    @Prop({default: () => config})
    config: Config

    get account() {
        return store.state.account;
    }

    created() {
        Mastodon.verifyCredentials().then(_ => store.commit(MutationTypes.SET_ACCOUNT, _));
    }

}