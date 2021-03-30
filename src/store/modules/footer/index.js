import * as actions from './actions'
import * as getters from './getters/'
import * as mutations from './mutations'

const state = {
    copyright: "",
    email: "",
    emailHrefText: "",
    emailText: "",
    startDate: "",
}

export const footer = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}