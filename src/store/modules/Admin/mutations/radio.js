module.exports = (state, payload) => {
	console.log( 'state', payload )
  if(payload.hasOwnProperty('swiperHead'))
    state.request.Radio.swiperHead = payload.swiperHead
  if(payload.hasOwnProperty('swiperHeadOp'))
    state.request.Radio.swiperHeadOp = payload.swiperHeadOp
}