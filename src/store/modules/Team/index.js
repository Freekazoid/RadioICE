import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    teamTitle: '',
    team: [],
    swiper: [],
    swiperOption: {},
    passwordAdmin: '',
}

export const Team = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}