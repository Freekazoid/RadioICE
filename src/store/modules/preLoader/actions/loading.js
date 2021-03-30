module.exports = (context) => {
    //var called = false,
    ready = () => {
      //if (called) return
      //called = true
      context.rootState.isLoggedIn = false
      let date = ''+(new Date().getTime()),
        lastData = ''+context.rootState.lastData
        
      if( lastData.length > 0 && Number(lastData.slice(0, 9)) <= Number(date.slice(0, 9)) && !context.loader )
        setTimeout(() => context.commit('SET_LOADING', false), 1000)
      else
        setTimeout(() =>  ready(), 1000)
    }

    if ( document.addEventListener ) {
      document.addEventListener( "DOMContentLoaded", () => ready, false )
    } else if ( document.attachEvent ) {
      if ( document.documentElement.doScroll && window == window.top ) {
        (() => {
          if (called) return
          if (!document.body) return
          try {
            document.documentElement.doScroll("left")
            ready()
          } catch(e) {
            setTimeout(tryScroll, 0)
          }
        })()
      }
      document.attachEvent("onreadystatechange", () => {
        if ( document.readyState === "complete" )
          ready()
      })
    }

    if (window.addEventListener)
      window.addEventListener('load', ready, false)
    else if (window.attachEvent)
      window.attachEvent('onload', ready)
    /*else
      window.onload=ready
  */
}