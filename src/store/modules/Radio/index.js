import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'

const state = {
  newItems: [],
  swiperHead: [],
  swiperHeadOp: {},
  swiperNewItems: [],
  swiperNewItemsOp:{},
  swiperNewVideo: [],
  swiperNewVideoOp: {},
}

export const Radio = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}