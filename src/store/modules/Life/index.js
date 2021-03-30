import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    newsLinck: [],
    dataNews: [],
}

export const Life = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}