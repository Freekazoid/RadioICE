module.exports = (state, payload) => {
  if(payload.hasOwnProperty('delete')){
    if(state.request.listStream.length === 0)
      state.request.listStream[0] = 'delete'

    // state.request.listStream[1] = payload.delete
    state.request.listStream.push(payload.delete)
  } else if(payload.hasOwnProperty('update')){
    if(state.request.listStream.length === 0)
      state.request.listStream[0] = 'update'

    const index = state.request.listStream.findIndex(l => l.id === payload.update.id)
    if(index !== -1)
      state.request.listStream[index] = payload.update
    else
      state.request.listStream.push(payload.update)
  } else if(payload.hasOwnProperty('insert')){
    if(state.request.listStream.length === 0)
      state.request.listStream[0] = 'insert'
      
    state.request.listStream.push(payload.insert)
    }
}