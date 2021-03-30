import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
    playList: [],
    swiper: [],
    swiperOption: {},
}

export const PlayList = {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}