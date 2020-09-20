import * as actions from './actions'
import * as getters from './getters/'
import * as mutations from './mutations'

const state = {
    menuAdmin: [],
    password: '',
    passwordReadmin: '',
    request: {},
}

export const Admin = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}