module.exports = (state, payload) => {
  if(payload.hasOwnProperty('program'))
    state.request.Programs.program = payload.program
}