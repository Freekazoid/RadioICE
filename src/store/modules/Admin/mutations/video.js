module.exports = (state, payload) => {
  if(payload.hasOwnProperty('listVideo'))
    state.request.Video.listVideo = payload.listVideo
}