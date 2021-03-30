module.exports = (state, payload) => {
  return `mailto:${state.email}?subject=${state.emailHrefText}`
}