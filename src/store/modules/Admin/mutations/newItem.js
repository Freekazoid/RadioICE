module.exports = (state, payload) => {
  if(payload.hasOwnProperty('newItems'))
    state.request.NewItem.newItems = payload.newItems  
}