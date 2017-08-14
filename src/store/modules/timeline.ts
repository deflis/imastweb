import { getStoreBuilder } from "vuex-typex"
import { ActionContext, Store } from "vuex"
import { RootState } from "../"
import { Status } from "../../api/mastodon"

export type Status = Status

export interface TimelineState { 
    homeTimeline: Status[]
    localTimeline: Status[]
 }
export interface Product { id: string, name: string }

const initialInventoryState: TimelineState =  {
    homeTimeline: []
    localTimelone: []
}
const p = getStoreBuilder<RootState>().module("timeline", initialInventoryState)

const getProductByIdGetter = p.read(state => (id: string) => state.productsById[id], "getProductById")

// state
const stateGetter = p.state()

// exported "inventory" module interface
const inventory = {
    // state
    get state() { return stateGetter() },
    
    // getter as method
    getProductById(id: string)
    {
        return getProductByIdGetter()(id)
    }
}
export default inventory