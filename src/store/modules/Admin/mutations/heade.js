module.exports = (state, payload) => {
  if(payload.hasOwnProperty('logoImg'))
    state.request.header.logoImg = payload.logoImg
  if(payload.hasOwnProperty('routerLink'))
    state.request.header.routerLink = payload.routerLink
}