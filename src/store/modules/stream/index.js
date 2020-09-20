import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    streamLive: {},
}

export const stream = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}