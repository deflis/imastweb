import {MutationTree} from 'vuex';
import {State} from './state';

export type MutationTypes =
    'SET_CODE' | 'SET_ACCOUNT'

export const MutationTypes = {
    SET_CODE: 'SET_CODE',
    SET_ACCOUNT: 'SET_ACCOUNT',
}

import { getToken,  Account } from "../api/mastodon"
import { save as saveConfig } from "../api/config"


const mutation : MutationTree<State> = {
    async [MutationTypes.SET_CODE](state: State, code: string) {
        let token = await getToken(code)
        state.config.token = token;
        saveConfig();
    },

    [MutationTypes.SET_ACCOUNT](state: State, account: Account) {
        state.account = account;
    }
}

export default mutation;