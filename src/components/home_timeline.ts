import { Component, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator'

import timeline from './timeline/index.vue'

import Mastodon, { Status } from '../api/mastodon'
import { Subscription } from 'rxjs'

@Component({
    components: {
        timeline,
    }
})

export default class HomeTimeline extends Vue {
    @Prop({ default: () => [] })
    statuses: Status[]

    subscriptions: Subscription[] = []

    async getTimeline() {
        const _stream = Mastodon.userStream();

        const home = await Mastodon.getHomeTimeline();
        for (let s of home)
            this.statuses.push(s);

        const stream = await _stream;

        this.subscriptions.push(
            stream.connection
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
    }
}