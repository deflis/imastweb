import axios from 'axios';
import * as queryString from 'query-string';
import websocket from './websocket'
import { Observable } from 'rxjs'

import appConfig from "./appconfig";
import config from "./config";

const redirectUri = `${appConfig.imast}/login/callback`
const instance = axios.create({
    "baseURL": `https://${appConfig.host}/api/v1/`,
});

export function createAuthRedirectUrl() {

    let params = {
        "client_id": appConfig.client_id,
        "response_type": "code",
        "redirect_uri": redirectUri,
    }
    return `https://${appConfig.host}/oauth/authorize?${queryString.stringify(params)}`
}

export interface Token {
    access_token: string
    token_type: string
    scope: string
    created_at: number
}

export async function getToken(code: string): Promise<Token> {
    let ret = await axios.post(`https://${appConfig.host}/oauth/token`, {
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        client_id: appConfig.client_id,
        client_secret: appConfig.client_secret,
        code: code
    })
    return ret.data;
}

export function setToken(accessToken: string) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${config.token.access_token}`;
}

interface IMastodonMessage{
    event: keyof PayloadMap
    payload: string
}

type StatusID = number
type AccountID = number

interface PayloadMap {
    "update": Status
    "notification": any
    "delete": StatusID
}

export interface Status {
    id: StatusID
    uri: string
    url: string
    account: Account
    in_reply_to_id?: StatusID
    in_reply_to_account_id?: AccountID
    reblog?: Status
    content: string
    created_at: string
    reblogs_count: number
    favourites_count: number
    reblogged?: boolean
    favourited?: boolean
    sensitive?: boolean
    spoiler_text: string
    visibility: Visibility
    media_attachments: Attachments[]
    mentions: Mentions[]
    tags: Tags[]
    application?: Application
    language: string
}

type Visibility = "public" | "unlisted" | "private" | "direct"
export interface Account {
    id: AccountID
    username: string
    acct: string
    display_name: string
    locked: boolean
    created_at: string
    followers_count: number
    following_count: number
    statuses_count: number
    note: string
    url: string
    avatar: string
    avatar_static: string
    header: string
    header_statuc: string
}
export interface Attachments {

}
export interface Mentions {

}
export interface Tags {

}
export interface Application {

}

class MastodonMessage<K extends keyof PayloadMap> {
    private constructor(event: K, payload: PayloadMap[K]) {
        this.event = event
        this.payload = payload
    }


    static create<K extends keyof PayloadMap>(message: IMastodonMessage): MastodonMessage<K>;
    static create<K extends keyof PayloadMap>(event: K, payload: PayloadMap[K]): MastodonMessage<K>;

    static create<K extends keyof PayloadMap>(v: K | IMastodonMessage, payload: PayloadMap[K] = undefined): MastodonMessage<K> {
        if (payload) {
            let event = <K>v;
            return new this(event, payload);
        } else {
            let message = <IMastodonMessage>v;
            return new this(<K>message.event, JSON.parse(message.payload));
        }
    }

    event: K
    payload: PayloadMap[K]
}

async function createStream(type: string) {
    const params = {
        access_token: config.token.access_token,
        stream: type,
    }
    const stream = await websocket.create<IMastodonMessage>(`wss://${appConfig.host}/api/v1/streaming?${queryString.stringify(params)}`);
    return stream.map(message => MastodonMessage.create(message));
};

export class Mastodon {
    limit = 100

    userStream() {
        return createStream("user");
    }
    private localStream() {
        return createStream("public:local");
    }

    getLocalStream() {    
        let statuses = Observable.fromPromise(this.getLocalTimeline()).flatMap(_ => _.reverse()).map(_ => MastodonMessage.create("update", _))
        let stream = Observable.fromPromise(this.localStream()).flatMap(_ => _.connection)

        return statuses.concat(stream)
    }
    publicStream() {
        return createStream("public");
    }

    async verifyCredentials(): Promise<Account> {
        const ret = await instance.get("/accounts/verify_credentials")
        return ret.data;
    }

    async getTimeline(type: String, local: boolean = false, maxId?: number, sinceId?: number, limit: number = this.limit): Promise<Status[]> {
        const params = {
            local: local ? "true" : null,
            max_id: maxId,
            since_id: sinceId,
            limit: limit,
        }
        const ret = await instance.get(`/timelines/${type}?${queryString.stringify(params)}`, )
        return ret.data;
    }
    
    async getHomeTimeline(maxId?: number, sinceId?: number, limit: number = this.limit) {
        return await this.getTimeline("home", false, maxId, sinceId, limit);
    }

    async getLocalTimeline(maxId?: number, sinceId?: number, limit: number = this.limit) {
        return await this.getTimeline("public", true, maxId, sinceId, limit);
    }
}

const mastodon = new Mastodon();

export default mastodon