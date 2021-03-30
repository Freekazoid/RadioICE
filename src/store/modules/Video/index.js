import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    listVideo: [],
    swiper: [],
    swiperOption: {},
}

export const Video = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}