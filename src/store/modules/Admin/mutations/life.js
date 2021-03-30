module.exports = (state, payload) => {
  if(payload.hasOwnProperty('newsLinck'))
    state.request.Life.newsLinck = payload.newsLinck  
  if(payload.hasOwnProperty('dataNews'))
    state.request.Life.dataNews = payload.dataNews
}