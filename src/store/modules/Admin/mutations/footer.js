module.exports = (state, payload) => {
  console.log( payload)
  if(payload.hasOwnProperty('copyright'))
    state.request.footer.copyright = payload.copyright
  if(payload.hasOwnProperty('email'))
    state.request.footer.email = payload.email
  if(payload.hasOwnProperty('emailHref'))
    state.request.footer.emailHref = payload.emailHref
  if(payload.hasOwnProperty('emailText'))
    state.request.footer.emailText = payload.emailText
  if(payload.hasOwnProperty('startDate'))
    state.request.footer.startDate = payload.startDate
}