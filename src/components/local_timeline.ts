import { Component, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator'

import timeline from './timeline/index.vue'

import Mastodon, { Status } from '../api/mastodon'
import { Subscription } from 'rxjs'

@Component({
    components: {
        timeline,
    }
})

export default class LocalTimeline extends Vue {
    @Prop({ default: () => [] })
    statuses: Status[]

    subscriptions: Subscription[] = []

    getTimeline() {
        this.subscriptions.push(
            Mastodon.getLocalStream()
                .filter(value => value.event == "update")
                .subscribe(value => {
                    this.statuses.unshift(value.payload);
                }, error => console.error(error), () => console.error("complete"))
        );
    }
    created() {
        this.getTimeline();
    }
    destroyed() {
        for (let subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        this.subscriptions = [];
    }
}