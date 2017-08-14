import store from 'store/dist/store.modern';
import { Token } from "./mastodon";

export interface Config {
    token: Token
}
let _config = store.get("config");
if (!_config) _config = {
    token: null
};
const config: Config = _config;

export function save() {
    store.set("config", config);
}

export default config;