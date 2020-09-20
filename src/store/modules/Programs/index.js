import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    program: [],
}

export const Programs = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}