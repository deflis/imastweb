// root state object
// each Vuex instance is just a single state tree.

import mastodon, { Mastodon, Account } from "../api/mastodon"
import config, { Config } from "../api/config"

export class State {

    public mastodon: Mastodon;
    public account: Account | null;
    public config: Config;

    // state initializer
    constructor() {
        this.mastodon = mastodon;
        this.config = config;
        this.account = null;
    }
}

const state = new State();
export default state;