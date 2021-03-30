import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    menuAdmin: [],
    listStream: [],
    password: '',
    passwordReadmin: '',
    request: {},
    showWindow: 1,
}

export const Admin = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}