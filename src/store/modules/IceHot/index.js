import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    newItems: [],
    swiper: [],
    swiperOption: {},
}

export const IceHot = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}