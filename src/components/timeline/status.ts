import { Component, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator'

import moment from "moment"
import 'moment/locale/ja';

import { Status as _Satatus } from '../../api/mastodon'
import toImage from "./emoji"

moment.locale('ja');

@Component
export default class Status extends Vue {
    @Prop({ default : null })
    status: _Satatus

    get created_at() {
        const time = moment(this.status.created_at);
        return time.fromNow(true);
    }
    get avatar() {
        return {
            "background-image": `url(${this.status.account.avatar_static})`,
        }
    }
    get text() {
        return toImage(this.status.content);
    }

    get display_name() {
        return this.status.account.display_name ? toImage(this.status.account.display_name) : this.status.account.username;
    }
}