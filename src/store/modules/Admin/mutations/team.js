module.exports = (state, payload) => {
  if(payload.hasOwnProperty('teamTitle'))
    state.request.Team.teamTitle = payload.teamTitle  
  if(payload.hasOwnProperty('team'))
    state.request.Team.team = payload.team
}