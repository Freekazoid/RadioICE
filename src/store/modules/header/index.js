import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    logoImg: 'iceRadioLogo.svg',
    routerLink: [],
}

export const header = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}