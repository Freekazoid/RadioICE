#!/snap/bin/node node
const colors = {
  WHITE: "\033[39m",    /*белый*/
  RED:'\033[0;31m',     /*красный*/
  GREEN:'\033[0;32m',   /*зелёный*/
  YELLOW:'\033[0;33m',  /*желтый*/
  BLUE:'\033[0;34m',    /*синий*/
  MAGENTA:'\033[0;35m', /*фиолетовый*/
  CYAN:'\033[0;36m',    /*голубой*/
  GRAY:'\033[0;37m',    /*серый*/
},
/* env = require('dotenv').config().parsed,*/
path = require('path'),
env = require('dotenv').config({ path: path.join(__dirname, '.env') }).parsed,
SimpleNodeLogger = require('simple-node-logger'),
log = SimpleNodeLogger.createSimpleLogger( {
  logFilePath:'logfile.log',
  timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
}),
table = env.DB_TABLE.split(','),/* ['admin', 'header', 'footer', 'radio', 'newitem', 'programs', 'icehot', 'team', 'life', 'playlist', 'video']*/
FTPfileJSON = env.FTP_JSON_file,
app = require('express')(),
parseJSON = require('json-parse-async'),
request = require("request"),
cors = require('cors'),
upload = require('express-fileupload'),
cheerio = require("cheerio"),
youtubeAPI = require('youtube-api-v3-search'),
fs  = require('fs'),
itunesAPI = require("itunes-search-api"),
mysql = require('mysql2/promise'),
server = require('http').createServer(app),
serverSSL = require('https').createServer({
    key:  fs.readFileSync(env.SERVER_KEY),
    cert: fs.readFileSync(env.SERVER_CERT),
    ca:   fs.readFileSync(env.SERVER_CA),
    requestCert: false,
    rejectUnauthorized: false,
  }, app),
io = require('socket.io')(server, {
  key:  fs.readFileSync(env.SERVER_KEY),
  cert: fs.readFileSync(env.SERVER_CERT),
  ca:   fs.readFileSync(env.SERVER_CA),
  secure: true,
  rejectUnauthorized: false,
  transports:	['polling', 'websocket'],
  serveClient: true,
  pingInterval: 25000,
  pingTimeout: 10000,
  allowUpgrades: true,
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true,
  optionsSuccessStatus: 204 
}),
/*
saveFile = (str, json=false, fileName=false) => {
  if(typeof str === 'object'){
    let array = str
    str = '['+'\r\n'
    array.forEach((item, i) => str += JSON.stringify(array[i])+((array.length-1)==i?'\r\n':',\r\n'))
    str += ']'
  }
  str+='\r\n'
  if(!json && !fileName){
    fs.appendFile('./logInfo.log', str, err => {
      if(err) throw err;
      return 'Successfully saved'
    })
  } else if(json && !fileName) {
    fs.writeFile('../dist/log/logInfo.json', str, err => {
      if(err) throw err;
      return 'Successfully saved'
    })
  } else if(!json && fileName) {
    fs.appendFile(fileName, str, err => {
      if(err) throw err;
      return 'Successfully saved'
    })
  } else if(json && fileName) {
    fs.writeFile(fileName, str, err => {
      if(err) throw err;
      return 'Successfully saved'
    })
  } else 
    return 'Error saved'
},
*/
filterByID = (arr, Id) => (Id !== false? arr.filter(i => i.id === Id)[0]: undefined),
sortByRating = arr => arr.sort((a, b) => a.rating < b.rating ? 1 : -1),
ImageEdit = (img) => typeof img !== "undefined"?img.indexOf('iceRadioLogo.svg')>-1?`/img/iceRadioLogo.svg`:img:`/img/iceRadioLogo.svg`,
arrayRandElement = (arr) => (typeof arr !== 'undefined'?arr[Math.floor(Math.random() * arr.length)]:undefined),
nowDateTime = (...args) => {
  let data = false,
    str = false,
    pattern = /(\d{2})\.(\d{2})\.(\d{4})/,
    D = new Date(new Date().toUTCString())
  
  if(args.length === 1){
    if(!isNaN(Date.parse(args[0].replace(pattern,'$3-$2-$1')))){
      if(args[0] instanceof Date)
        D = new Date(args[0].toUTCString())
      else if(!isNaN(Date.parse(args[0].replace(pattern,'$3-$2-$1')))){
        let st = args[0].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
      }
    }else if(args[0].match(/yyyy|MM|dd|hh|mm|ss/g))
      str = args[0]
    else if(args[0].match(/[+]|[-]/g))
      data = args[0]
  } else if(args.length === 2){
    if((!isNaN(Date.parse(args[0].replace(pattern,'$3-$2-$1'))) || !isNaN(Date.parse(args[1].replace(pattern,'$3-$2-$1')))) && (args[0].match(/[+]|[-]/g) || args[1].match(/[+]|[-]/g)) ){
      if(args[0] instanceof Date && args[1].match(/(^\+\s|^-\s)/g)){
        D = new Date(args[0].toUTCString())
        data = args[1]
        str = 'yyyy-MM-dd hh:mm:ss'
      }else if(args[1] instanceof Date && args[0].match(/(^\+\s|^-\s)/g)){
        D = new Date(args[1].toUTCString())
        data = args[0]
        str = 'yyyy-MM-dd hh:mm:ss'
      }else if(!isNaN(Date.parse(args[0].replace(pattern,'$3-$2-$1'))) && args[1].match(/(^\+\s|^-\s)/g) ){
        let st = args[0].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
        data = args[1]
        str = 'yyyy-MM-dd hh:mm:ss'
      }else if(!isNaN(Date.parse(args[1].replace(pattern,'$3-$2-$1'))) && args[0].match(/(^\+\s|^-\s)/g)){
        let st = args[1].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
        data = args[0]
        str = 'yyyy-MM-dd hh:mm:ss'
      }else if(args[0] instanceof Date && args[1].match(/yyyy|MM|dd|hh|mm|ss/g)){
        D = new Date(args[0].toUTCString())
        str = args[1]
      }else if(args[1] instanceof Date && args[0].match(/yyyy|MM|dd|hh|mm|ss/g)){
        D = new Date(args[1].toUTCString())
        str = args[0]
      }else if(!isNaN(Date.parse(args[0].replace(pattern,'$3-$2-$1'))) && args[1].match(/yyyy|MM|dd|hh|mm|ss/g)){
        let st = args[0].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
        str = args[1]
      }else if(!isNaN(Date.parse(args[1].replace(pattern,'$3-$2-$1'))) && args[0].match(/yyyy|MM|dd|hh|mm|ss/g)){
        let st = args[1].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
        str = args[0]
      }
    }else if(args[0].match(/yyyy|MM|dd|hh|mm|ss/g)){
      data = args[1]
      str = args[0]
    }else if(args[0].match(/(^\+\s|^-\s)/g)){
      str = args[1]
      data = args[0]
    }
  } else if(args.length === 3){
    if(!isNaN(Date.parse(args[0].replace(pattern,'$3-$2-$1'))) && args[1].match(/(^\+\s|^-\s)/g) && args[2].match(/yyyy|MM|dd|hh|mm|ss/g)){
      if(args[0] instanceof Date)
        D = new Date(args[0].toUTCString())
      else {
        let st = args[0].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
      }
      data = args[1]
      str = args[2]
    } else if(!isNaN(Date.parse(args[0].replace(pattern,'$3-$2-$1'))) && args[2].match(/(^\+\s|^-\s)/g) && args[1].match(/yyyy|MM|dd|hh|mm|ss/g)){
      if(args[0] instanceof Date)
        D = new Date(args[0].toUTCString())
      else {
        let st = args[0].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
      }
      data = args[2]
      str = args[1]
    } else if(!isNaN(Date.parse(args[1].replace(pattern,'$3-$2-$1'))) && args[0].match(/(^\+\s|^-\s)/g) && args[2].match(/yyyy|MM|dd|hh|mm|ss/g)){
      if(args[1] instanceof Date)
        D = new Date(args[1].toUTCString())
      else {
        let st = args[1].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
      }
      data = args[0]
      str = args[2]
    } else if(!isNaN(Date.parse(args[2].replace(pattern,'$3-$2-$1'))) && args[0].match(/(^\+\s|^-\s)/g) && args[1].match(/yyyy|MM|dd|hh|mm|ss/g)){
      if(args[2] instanceof Date)
        D = new Date(args[2].toUTCString())
      else {
        let st = args[2].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
      }
      data = args[0]
      str = args[1]
    } else if(!isNaN(Date.parse(args[2].replace(pattern,'$3-$2-$1'))) && args[1].match(/(^\+\s|^-\s)/g) && args[0].match(/yyyy|MM|dd|hh|mm|ss/g)){
      if(args[2] instanceof Date)
        D = new Date(args[2].toUTCString())
      else {
        let st = args[2].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
      }
      data = args[1]
      str = args[0]
    } else if(!isNaN(Date.parse(args[1].replace(pattern,'$3-$2-$1'))) && args[2].match(/(^\+\s|^-\s)/g) && args[0].match(/yyyy|MM|dd|hh|mm|ss/g)){
      if(args[1] instanceof Date)
        D = new Date(args[1].toUTCString())
      else {
        let st = args[1].split(', '), dp = st[0].split('.'), tp = st[1].split(':')
        D = new Date(new Date(dp[2], (dp[1]-1), dp[0], tp[0], tp[1], tp[2]).toUTCString())
      }
      data = args[2]
      str = args[0]
    }
  }

  if(data){
    [act, numbers, date] = data.split(' ')
    switch(act){
      case '+': 
        switch(date){
          case 'year': 					  
              D.setFullYear(D.getFullYear() + Number(numbers))
            break
          case 'month': 
              D.setMonth(D.getMonth() + Number(numbers))
            break
          case 'day':
            D.setDate(D.getDate() + Number(numbers))
            break
          case 'hour':
            D.setHours(Number(D.getHours()) + Number(numbers))
            break
          case 'minute':
            D.setMinutes(D.getMinutes() + Number(numbers))
            break
          case 'second':
            D.setSeconds(D.getSeconds() + Number(numbers))
            break
        }
        break
      case '-':
        switch(date){
          case 'year': 					  
              D.setFullYear(D.getFullYear() - Number(numbers))
            break
          case 'month': 
              D.setMonth(D.getMonth() - Number(numbers))
            break
          case 'day':
            D.setDate(D.getDate() - Number(numbers))
            break
          case 'hour':
            D.setHours(Number(D.getHours()) - Number(numbers))
            break
          case 'minute':
            D.setMinutes(D.getMinutes() - Number(numbers))
            break
          case 'second':
            D.setSeconds(D.getSeconds() - Number(numbers))
            break
        }
        break
    }
  } 

  const dateTimeFormat = new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}),
      [{value: day},,{value: month},,{value: year},,{value: hour},,{value: minute},,{value: second}] = dateTimeFormat.formatToParts(D)
  
  if(data && !str || !data && !str)
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  else if(!data && str || data && str){
    str = str.replace(/yyyy|MM|dd|hh|mm|ss/g, function(match){
      return {yyyy: year,MM: month,dd: day,hh: hour,mm: minute,ss: second}[match]
    })
    return str
  }
},
getWeekDay = () => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][new Date().getDay()],
add3Weck = () => nowDateTime('+ 21 day', "yyyy-MM-dd hh:mm:ss"),
searchItunes = async (serch) => {
  /*https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/*/
  let tunseShow;
  try {
    const serching = serch.toLowerCase().replace(/ +(?= )|radio edit|radio ice remix/gmi, ''),
    response = await itunesAPI(serching, {
      limit: 1,/*Number of results to return [Default: 25]*/
      country: "ru",/*Two-letter country code [Default: us]*/
      entity: "song"/*Type of results returned [Default: album]*/
    }).catch((e) => {
      log.log('error', e)
    })
    tunseShow = response.body.results[0]
    return (response.body.results.length ? {img: tunseShow.artworkUrl100, track: tunseShow.artistViewUrl} : undefined)
  } catch (error) {
    return undefined
  }
},
searchYoutube = async (serch) => {
  /*https:/*developers.google.com/youtube/v3/docs/search/list
    google.com register info data
    login: djholodok@mail.ru
    passw: Ice525525
    apiKey: AIzaSyB_z_C3lycb1OnXmEnA0oTouh53XaAVWE4
    secretCode: jgB-y4bl5-fxRU8-eph38UGP*/
  const res = '',
    serching = serch.toLowerCase().replace(/ +(?= )|radio edit|radio ice remix/gmi, ''),
    result = await youtubeAPI('AIzaSyB_z_C3lycb1OnXmEnA0oTouh53XaAVWE4',{
      q: serching,
      order: 'rating',
      type: 'video, musick',
      part: 'id, snippet',
      maxResults: 1,
      userIp: "109.168.145.32",/*If end quote. you nid ip adres you server*/
      "video-duration": 'short',
      "video-license": 'creativeCommon'
    })
    try {
      return (!result.hasOwnProperty('error')? 'https:/*www.youtube.com/embed/'+result.items[0].id.videoId: undefined)
    } catch (e) {
      log.log('error',e)
    }      
},
usersRespons = (data, events, id=false) => {
  id === false? (io.emit(events, data)) : (io.sockets.connected[id].emit(events, data))
  if(id !== false)
    log.log('info',`${colors.WHITE}usersRespons,  events: ${events} id: ${id}`)
},
liveListner = () => {
  if(typeof live !== 'undefined')
    return
  live = false
  lives = () => 
    request(env.SERVER_ONAIR, (err, res, body) => {
      if (err) return false
      if(!tableDB.hasOwnProperty('stream')) return false
      
      if (tableDB.stream.hasOwnProperty('streamLive')){
        let $ = cheerio.load(body),
          listnerState = parseInt(tableDB.stream.streamLive.listner),
          listner = 0,
          allListnerArr = $('td').map(function () { return ($(this).text() === 'Current Listeners:' ? parseInt($(this).next().text()): null)}).get()

        allListnerArr.forEach(item => {
          listner+=item
        })

        if (listnerState !== listner){
          tableDB.stream.streamLive.listner = listner
          usersRespons(tableDB, 'response')
        }
      }
      clearTimeout(live)
      live = setTimeout(lives, 1000)
    })
  lives()
},
addTextWeckRating = (id=false) => {
  const arr = ['неделя','недели','недель'],
    obj = filterByID(tableDB.liststream, id)

  if(typeof obj !== 'undefined'){
    const nawDate = new Date().getTime(),
      daysLag = Math.ceil(Math.abs(nawDate - obj.start_time.getTime()) / (1000 * 3600 * 24)),
      weekAgo = Math.ceil(daysLag/7)

    if( [1, 21, 31, 41, 51].includes(weekAgo))
      return `${weekAgo} ${arr[0]}`
    else if([2,3,4, 22,23,24, 32,33,34, 42,43,44, 52,53,54].includes(weekAgo))
      return `${weekAgo} ${arr[1]}`
    else if([5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,25,26,27,28,29,30,35,36,37,38,39,40,45,46,47,48,49,50,55,56,57,58,59,60].includes(weekAgo))
      return `${weekAgo} ${arr[2]}`
  } else
    return 'newitem'
},
JSONtime = (id=false) => {
  let time = nowDateTime(),
    index = 0,
    obj = filterByID(tableDB.liststream, id)
  if(typeof obj !== 'undefined')
    if(obj.time_live !== null){
      let key = Object.keys(obj.time_live)
      key.forEach((i,it)=> index = Number(it))
      obj.time_live[index+1] = time
      return obj.time_live
    }
  return {0: time}
},
fromJSONtoLIVE = async () => {
  await DBselect(['liststream'])/* Select data table*/
  const nawDate = nowDateTime()
  tableDB.stream = ((typeof tableDB.stream !== 'object')? {} : tableDB.stream)
  
  dataJson = (err=false, json=false) => {
    if (err) {
      log.log('error',colors.RED+'Error parseJSON: '+ nawDate +' '+ err+ colors.WHITE)
      return false
    }
    
    if(typeof json === 'object' && json.hasOwnProperty("ELEM_LIST")){
      let oneCall = true,
        JSONFile = (typeof json.ELEM_LIST.ELEM[1] === 'undefined' ? json.ELEM_LIST.ELEM :json.ELEM_LIST.ELEM[0])
      JSONFile.LISTNER = json.ELEM_LIST.LISTNER

      if(typeof tableDB.liststream === 'object'){
        /* console.log( Array.from(tableDB.liststream) )*/
        if (Array.from(tableDB.liststream)){
          NewItemLive(JSONFile)
          log.log('info',colors.GREEN+'new item live '+colors.BLUE+ nawDate+ colors.WHITE+' name: '+JSONFile.NAME+' artist: '+JSONFile.ARTIST)
          /* saveFile('new item: '+nawDate+'\r\n      name: '+JSONFile.NAME+' artist: '+JSONFile.ARTIST+"\r\n")*/
        } else {
          tableDB.liststream.forEach((item, key) => {
            if (JSONFile.NAME === item.name && JSONFile.ARTIST === item.artist) {
              (tableDB.stream.hasOwnProperty('streamLive')?
              ratingMeasurement(parseInt(tableDB.stream.streamLive.listner)):
              ratingMeasurement(json.ELEM_LIST.LISTNER));

              const timerating = addTextWeckRating(item.id),
                timeLive = JSONtime(item.id)

              tableDB.stream.streamLive = {
                id: item.id,
                type: JSONFile.BLK_TYPE,
                name: item.name,
                artist: item.artist,
                img: item.img,
                listner: JSONFile.LISTNER
              }
              
              oneCall = false
              log.log('info',colors.RED+'repite live '+colors.BLUE + nawDate +' '+ colors.WHITE+'id: '+item.id+' name: '+JSONFile.NAME+' === '+item.name+' artist: '+JSONFile.ARTIST+' === '+item.artist)
              /* saveFile('repite live: '+nawDate+'\r\n      id: '+item.id+' name: '+JSONFile.NAME+' === '+item.name+' artist: '+JSONFile.ARTIST+' === '+item.artist+"\r\n")*/
              console.log(tableDB)
              usersRespons(tableDB, 'response')
              DBupdate({liststream: {id: item.id, updatePluse: true, broadcasting: 1}})/* Update table lesson from broadcasting */
              DBupdate({liststream: {id: item.id, timerating: timerating, time_live: timeLive, start_time: nowDateTime(), end_time: add3Weck()}})/* Update table lesson from timerating*/
            } else if (key === tableDB.liststream.length-1 && oneCall){
              NewItemLive(JSONFile)
              log.log('info',colors.GREEN+'new item live'+colors.BLUE+ nawDate+ colors.WHITE+'name: '+JSONFile.NAME+' artist: '+JSONFile.ARTIST)
              /* saveFile('new item: '+nawDate+'\r\n      name: '+JSONFile.NAME+' artist: '+JSONFile.ARTIST+"\r\n")*/
            }
          })
        }
      }
      liveListner()
    }
  }
  
  fs.readFile(FTPfileJSON, {encoding : 'utf-8'}, async (err, data) => {
    if (err) throw err
    /* console.log( typeof data )*/
    if(data !== saveLastJSON){
      log.log('info',colors.YELLOW+'call from JSON file '+colors.WHITE+nowDateTime())
      parseJSON(data, dataJson)
      saveLastJSON = data
      fromJSONtoLIVE()
    }
  })

 await playList()
 await videoList()
},
NewItemLive = async (JSONFile) => {
  if(JSONFile.BLK_TYPE === "М"){
    const itunse = await searchItunes(`${JSONFile.ARTIST} ${JSONFile.NAME}`),
      youTube = await searchYoutube(`${JSONFile.ARTIST} ${JSONFile.NAME}`),
      videoLinck = (typeof youTube === 'undefined'?'https:/*youtube.com/watch?v=':youTube),
      images = (typeof itunse !== 'undefined'? itunse.img : 'iceRadioLogo.svg'),
      img = (JSONFile.BLK_TYPE !== 'П'? images: 'program.png'),/*image program*/
      track = (typeof itunse !== 'undefined'? itunse.track : ''),
      timerating = addTextWeckRating(),
      timeLive = JSONtime(),
      live = {
        start_time: nowDateTime(),
        end_time: add3Weck(), /* +3 недели*/
        name: JSONFile.NAME,
        artist: JSONFile.ARTIST,
        duration: JSONFile.DURATION,
        img: img,
        listner: JSONFile.LISTNER,
        trackLinck: track,
        videoLinck: videoLinck,
        timerating: timerating,
        time_live: timeLive
      }
    tableDB.stream.streamLive = live     
    DBinsert({liststream: live})
    usersRespons(tableDB, 'response')
    await NewItem()
  }
},
ratingMeasurement = async (startList) => {
  setTimeout(() => {
    
    let start = parseInt(startList),
      end = parseInt(tableDB.stream.streamLive.listner),
      id = tableDB.stream.streamLive.id

    if( start > end ){
      DBupdate({liststream: {id: id, updatePluse: true, rating: -(start - end)}})
    }else if( start < end ){
      DBupdate({liststream: {id: id, updatePluse: true, rating: (end - start)}})
    }
    /* saveFile(`{"time": ${env.TIME_RATING},"date":"${nowDateTime()}","img":"${tableDB.stream.streamLive.img}","id":"${id}", "name": "${tableDB.stream.streamLive.name}", "artist": "${tableDB.stream.streamLive.artist}", "start": ${start}, "end": ${end}, "sum": ${(end - start)}}`, true)*/
    log.log('info',colors.BLUE+'startRating: '+colors.WHITE+'id: '+id+'\r\n                     Start: '+colors.CYAN+start+colors.WHITE+' start > end '+colors.GREEN+(start>end)+colors.WHITE+' '+colors.YELLOW+String(-(start - end))+colors.WHITE+'\r\n                     End: '+colors.CYAN+end+colors.WHITE+' start < end '+colors.GREEN+(start<end)+colors.WHITE+' '+colors.YELLOW+String(end - start)+colors.WHITE)
  }, env.TIME_RATING*1000)
}, 
parserJSON = (str) => {
  try {
    str = JSON.parse(str);
  } catch (e) { }
  
  return str;
},
getNormalizeObj = (obj) => {
  let result = {}, iterator
  (iterator = (o) => {
    for(var i in o) {
      if (o.hasOwnProperty(i)) {
        o[i] = parserJSON(o[i])
        if (o[i].hasOwnProperty('0') && !o[i].hasOwnProperty('1')) {
          o[i] = o[i][0]
          if (typeof o[i] === 'object')
            iterator(o[i])
        } else if (o[i].hasOwnProperty('0') && o[i].hasOwnProperty('1') && typeof o[i] === 'object')
          o[i] = Object.values(o[i])
      }
    }
    if(Object.keys(o).length === Object.keys(obj).length)
      result = o
  })(obj)
  return result
},
DBupdate = async (data) => {
  const connect = await mysql.createConnection({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    host: env.DB_HOST,
    database: env.DB_DATABASE,
  }).catch( e => log.log('error',e) )
    let key, 
      table = Object.keys(data),
      n = table.length,
      dat={}
    while (n--) {
      key = table[n]
      dat[key.toLowerCase()] = data[key]
    }
    for(let t in table) {
      const rows = Object.keys(data[table[t]])
      // console.log(colors.GREEN+'comin data upload to table'+colors.WHITE,  table[t], rows, dat )
      for(r in rows) {
        table[t] = table[t].toLowerCase()
        try {
          if(!['swiperHeadOp'].includes(rows[r]) && table.filter(item => ['admin','header','footer','radio','newitem','programs','icehot','team','life','playlist','video'].includes(item)).length > 0) {
            const value = (typeof dat[table[t]][rows[r]] === 'object'? (dat[table[t]][rows[r]].reduce((a, c, i) => { a[i] = c; return a; }, {})) : dat[table[t]][rows[r]]),
              valueToString = (typeof dat[table[t]][rows[r]] === 'object'? JSON.stringify(value) : value)
              [row, fields] = await connect.execute(`UPDATE ${env.DB_PREFIX}${table[t]} SET ${rows[r]}=?`, [valueToString])

            log.log('info','0 db UPDATE: '+(typeof fields === 'undefined'? `${colors.GREEN}TRUE${colors.WHITE}` : `${colors.RED}FALSE${colors.WHITE}`) )
          } else if(['swiperHeadOp'].includes(rows[r])){

            console.log(colors.GREEN+'comin data upload to table'+colors.WHITE,table[t],  dat[table[t]][rows[r]].reduce((a, c, i) => { a[i] = c; return a; }, {}) )

          } else {
            if(dat[table[t]][0] === 'update' && !['updatePluse', 'id'].includes(rows[r])){
              const key = parseInt(rows[r])
              if(key === 1){
                const id = dat[table[t]][key].id,
                  setVall = (typeof dat[table[t]][key] === 'object'? Object.entries(dat[table[t]][key]).map((a) => a[0]==='time_live'?(`${a[0]}='${JSON.stringify(a[1])}'`):a[0]!=='id'?(`${a[0]}='${a[1]}'`):null ).filter(e => e).toString():false),
                  [row, fields] = await connect.execute(`UPDATE ${env.DB_PREFIX}${table[t].toLowerCase()} SET ${setVall} WHERE id=${id}`)

                log.log('info','1 db UPDATE: '+table[0]+' '+(typeof fields === 'undefined'? `${colors.GREEN}TRUE${colors.WHITE}` : `${colors.RED}FALSE${colors.WHITE}`) )
              }
            } else if((dat[table[t]].hasOwnProperty('updatePluse') && dat[table[t]]['updatePluse'] ) && !['updatePluse','id','listSteam'].includes(rows[r])){
              const id = data[table[t]].id,
                value = (typeof data[table[t]][rows[r]] === 'object'? (data[table[t]][rows[r]].reduce((a, c, i) => { a[i] = c; return a; }, {})) : data[table[t]][rows[r]]),
                valueToString = (typeof data[table[t]][rows[r]] === 'object'? JSON.stringify(value) : value),
                [row, fields] = await connect.execute(`UPDATE ${env.DB_PREFIX}${table[t]} SET ${rows[r]}=${rows[r]}+${valueToString} WHERE id=${id}`)
              
              log.log('info','2 db UPDATE: '+table[0]+' '+((typeof fields === 'undefined' && row)? `${colors.GREEN}TRUE${colors.WHITE}` : `${colors.RED}FALSE${colors.WHITE}`) )
            } else if(!data[table[t]].hasOwnProperty('updatePluse') && !['updatePluse','id','listSteam','0'].includes(rows[r] )){
              const id = data[table[t]].id,
                setVall = (typeof data[table[t]][rows[r]] === 'object'?`${rows[r]}='${JSON.stringify(data[table[t]][rows[r]])}'` : `${rows[r]}='${data[table[t]][rows[r]]}'`),
                [row, fields] = await connect.execute(`UPDATE ${env.DB_PREFIX}${table[t]} SET ${setVall} WHERE id=${id}`)

              log.log('info','3 db UPDATE: '+table[0]+' '+(typeof fields === 'undefined'? `${colors.GREEN}TRUE${colors.WHITE}` : `${colors.RED}FALSE${colors.WHITE}`) )
            } 
          }
        } catch (e) {
          log.log('warn', colors.RED+'not UPDATE db'+colors.WHITE+"\r\n"+table[t]+" / "+rows.join(', ')+" => "+JSON.stringify(dat[table[t]][rows[r]])+"\r\n"+e)
        }
      }
    }
  connect.end()
  DBselect(table)
},
DBselect = async (table, socket=false) => {
  const nawDate = nowDateTime("yyyy-MM-dd"),
    connect = await mysql.createConnection({
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      port: env.DB_PORT,
      host: env.DB_HOST,
      database: env.DB_DATABASE,
    }).catch( e => log.log(e) )
  
  for (let i in table) {
    if (table.hasOwnProperty(i)) {
      const item = table[i],
          [row, fields] = await connect.execute(`SELECT * FROM ${env.DB_PREFIX}${item}`)

      tableDB[item] = row
    }
  }
  
  tableDB = getNormalizeObj(tableDB)

  usersRespons(tableDB, 'response', socket.id)
  connect.end()
},
DBinsert = async (data) => {
  const connect = await mysql.createConnection({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    host: env.DB_HOST,
    database: env.DB_DATABASE,
  }).catch( e => log.log('error',e) ),
    table = Object.keys(data)
  
  let value = '',
    questyon = '',
    valueToArray = []
  
  for(t in table) {
    const rows = Object.keys(data[table[t]])
    for(r in rows) {
      if(data[table[t]][0] === 'insert'){
        const key = parseInt(rows[r])
        if(key === 1){
          value = Object.keys(data[table[t]][key]).toString()
          q = Array(Object.keys(data[table[t]][key]).length+1).join("?,")
          questyon = q.slice(0, -1)
          valueToArray = Object.values(data[table[t]][key])
        }
      } else if(!['listner'].includes(rows[r])){
        value += rows[r]+(r < rows.length-1?',':'')
        questyon += (r <= rows.length?'?':'')+(r < rows.length-1?',':'')
        valueToArray.push(data[table[t]][rows[r]])
      }
    }
    /* console.log(  `INSERT INTO ${env.DB_PREFIX}${table[t]} (${value}) VALUES(${questyon})`,  valueToArray )*/
    const [row, fields] = await connect.execute(`INSERT INTO ${env.DB_PREFIX}${table[t].toLowerCase()} (${value}) VALUES(${questyon})`,  valueToArray)
  }
  log.log('info','db insert: '+table[0]+' '+(typeof fields === 'undefined'? `${colors.GREEN}TRUE${colors.WHITE}` : `${colors.RED}FALSE${colors.WHITE}`) )
  connect.end()
},
DBdelete = async (data) => {
  const connect = await mysql.createConnection({
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    host: env.DB_HOST,
    database: env.DB_DATABASE,
  }).catch( e => log.log('error',e) ),
    table = Object.keys(data)
  let id = null
  for(t in table) {
    const rows = Object.keys(data[table[t]])
    for(r in rows) {
        id = data[table[t]][rows[r]].id
        const [row, fields] = await connect.execute(`DELETE from ${env.DB_PREFIX}${table[t].toLowerCase()} WHERE id = ${id}`)
    }
  }
  log.log('info','db delete: '+(typeof fields === 'undefined'? `${colors.GREEN}TRUE${colors.WHITE}` : `${colors.RED}FALSE${colors.WHITE}`) )
  connect.end()
},
playList = () => {
  let tmp = []
  if(tableDB.hasOwnProperty('liststream') && Array.from(tableDB.liststream)){
    tableDB.liststream.forEach((item, key) => {
      tmp.push({
        id:  item.id,
        img: ImageEdit(item.img),
        dateTime: item.time_live,
        radio: "radio-ice",
        name: item.name,
        artist: item.artist,
        delimiters: "&mdash;",
        trackLinck: item.trackLinck,
        youTubeLinck: item.videoLinck,
        play: false,
        hover: false,
        active: false
      })
    })
    tmp.reduce(function(result, item, index, array) {
      result[index] = item
      return result
    }, {})

    DBupdate({playlist: {playList: tmp}})/* Update table lesson from timerating*/
    DBselect(table)
    setTimeout( () => usersRespons(tableDB, 'response'), 5000)      
    log.log('info',"DBupdate - playlist")
  }
},
NewItem = () => {
  let tmp = [],
    randomTmp = [],
    tmps = {}
  if(tableDB.hasOwnProperty('liststream') && Array.from(tableDB.liststream)){
    tableDB.liststream.forEach(item => {
      const nawDate = new Date().getTime(),
        daysLag = Math.ceil(Math.abs(nawDate - item.start_time.getTime()) / (1000 * 3600 * 24))
        /* console.log( 'TEST',  daysLag )*/
        if(item.timerating === 'newitem' && daysLag <= 7){
        /* console.log( item.start_time, item.id, item.name, item.artist )*/
        tmp.push({
          id:  item.id,
          img: ImageEdit(item.img),
          name: item.name,
          artist: item.artist,
          rating: item.rating,
          timeRating: item.timerating,
          delimiters: "&mdash;",
          trackLinck: item.trackLinck,
          youTubeLinck: item.videoLinck,
          play: false,
          hover: false,
          active: false
        })
      } else 
        item.timerating = addTextWeckRating(item.id)
    })
    if(tmp.length){
      for(i=0; i<11; i++){
        tmps = arrayRandElement(tmp)
        if(typeof filterByID(randomTmp, tmps.id) === "undefined"){
          randomTmp.push({
            id:  tmps.id,
            img: ImageEdit(tmps.img),
            name: tmps.name,
            artist: tmps.artist,
            rating: tmps.rating,
            delimiters: "&mdash;",
            timeRating: tmps.timerating,
            trackLinck: tmps.trackLinck,
            youTubeLinck: tmps.videoLinck,
            play: false,
            hover: false,
            active: false
          })
        }
      }
      randomTmp.reduce(function(result, item, index, array) {
        result[index] = item
        return result
      }, {})
      tmp.reduce(function(result, item, index, array) {
        result[index] = item
        return result
      }, {})

      DBupdate({radio: {swiperNewItems: randomTmp}})/* Update table lesson from timerating*/
      DBupdate({newitem: {newItems: tmp}})/* Update table lesson from timerating*/
      DBselect(table)
      setTimeout( () => usersRespons(tableDB, 'response'), 5000)      
      log.log('info',"DBupdate - newitem")
    }
  }
},
videoList = () => {
  let tmp = [],
    randomTmp = [],
    tmps = {}
  if(tableDB.hasOwnProperty('liststream') && Array.from(tableDB.liststream)){
    tableDB.liststream.forEach((item, key) => {
      if(typeof item.videoLinck !== "undefined")
        if(item.videoLinck.match('(?:.*)\/(.*)?')[1]){
          tmp.push({
            id:  item.id,
            img: ImageEdit(item.img),
            name: item.name,
            artist: item.artist,
            linck: item.videoLinck,
            play: false,
            hover: false,
            active: false
          })
        }
    })
    if(tmp.length){
      for(i=0; i<15; i++){
        tmps = arrayRandElement(tmp)
          if(filterByID(randomTmp, tmps.id) === "undefined"){
            randomTmp.push({
              id:  tmps.id,
              linck: tmps.linck,
              img: ImageEdit(tmps.img),
              name: tmps.name,
              artist: tmps.artist,
            })
          }
      }
      randomTmp.reduce(function(result, item, index, array) {
        result[index] = item
        return result
      }, {})
      tmp.reduce(function(result, item, i) {
        result[i] = item
        return result
      }, {})

      DBupdate({radio: {swiperNewVideo: randomTmp}})/* Update table lesson*/
      DBupdate({video: {listVideo: tmp}})/* Update table lesson*/
      DBselect(table)
      setTimeout( () => usersRespons(tableDB, 'response'), 5000)      
      log.log('info',"DBupdate - videoList")
    }
  }
},
iceHost30List = () => {
  if(tableDB.hasOwnProperty('liststream')){
    let dateNow = nowDateTime(),
      IceHot = [],
      randomTmp = [],
      tmps = {},
      date = (!isNaN(tableDB.icehot.newItems.length-1)?(tableDB.icehot.newItems[tableDB.icehot.newItems.length-1].hasOwnProperty('stop')?tableDB.icehot.newItems[tableDB.icehot.newItems.length-1].stop:undefined):undefined)

    if(getWeekDay() === env.START_30_ICEHOT && Array.from(tableDB.liststream)){
      tableDB.liststream.forEach(item => {
        if(typeof date === 'undefined'){
          if( new Date(dateNow) >=  new Date(nowDateTime(item.start_time.toLocaleString())) && new Date(dateNow) <=  new Date(nowDateTime(item.end_time.toLocaleString())) )
          IceHot.push(item)
        } else if(new Date(date.stop) !== new Date(nowDateTime("yyyy-MM-dd"))){
          if( new Date(dateNow) >=  new Date(nowDateTime(item.start_time.toLocaleString())) && new Date(dateNow) <=  new Date(nowDateTime(item.end_time.toLocaleString())) )
            IceHot.push(item)
        }
      })
      
      for(i=0; i<10; i++){
        tmps = arrayRandElement(IceHot)
        if(tmps)
          if(filterByID(randomTmp, tmps.id) === undefined){
            /* console.log('TEST', tmps)*/
            randomTmp.push({
              id:  tmps.id,
              img: ImageEdit(tmps.img),
              name: tmps.name,
              artist: tmps.artist,
              rating: tmps.rating,
              delimiters: "&mdash;",
              timeRating: tmps.timerating,
              trackLinck: tmps.trackLinck,
              youTubeLinck: tmps.videoLinck,
              play: false,
              hover: false,
              active: false
            })
          }
      }
      randomTmp.reduce(function(result, item, index, array) {
        result[index] = item
        return result
      }, {})
      IceHots = sortByRating(IceHot)
      IceHots.push({stop: nowDateTime()})

      DBupdate({radio: {newItems: randomTmp}})
      DBupdate({icehot: {newItems: IceHots}})/* Update table lesson*/
      DBselect(table) 
      log.log('info',"DBupdate - iceHost30List")
    }
  }
}






let saveLastJSON = '',
tableDB = {},
usersIp = [],
timerId = setTimeout( iceHost30 = () => {
  let delim = 0
  if (getWeekDay() === env.START_30_ICEHOT){
    iceHost30List()
    delim = 600000
  } else 
    delim = 86400

  timerId = setTimeout(iceHost30, delim)
}, 3000)



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(upload())

app.post('/', (req, res) => {
  res.json({
    id: Object.keys(io.sockets.clients().connected),
    ip: usersIp,
    count: Array.from(Object.keys(io.sockets.clients().connected)).length
  })
})
app.post('/upload', (req,res) => {
if(req.files.file){
  var file = req.files.file,
    name = file.name,
    type = file.mimetype,
    uploadpath = env.UPLOAD_DIR + name
  /* console.log('file',file )*/
  file.mv(uploadpath, err => {
    if(err){
      log.log('info',"File Upload Failed", name, err)
      res.send('Error')
    } else {
      let newPath = env.UPLOAD_MP3
      fs.readdir(newPath, (err, files) => {
        /* let newName = String(files.length+1)
         newName = (newName.length===8?newName:'0'.repeat(8-newName.length)+newName)
        /* newPath = newPath+newName+'.mp3'*/
        newPath = newPath+name
      
        fs.rename(uploadpath, newPath, function (err) {
          if (err) throw err
          log.log('info',"File Uploaded", newPath)
          res.send({'Done': name})
        })
      })
    }
  })
} else {
  res.send("No File selected !")
  res.end()
}
})
app.get('/', (req, res) => {
/* res.sendFile(__dirname+'/dist/index.html');*/
  res.json({
    id: Object.keys(io.sockets.clients().connected),
    ip: usersIp,
    count: Array.from(Object.keys(io.sockets.clients().connected)).length
})
})
app.get('/upload', (req, res) => {
  res.send("load file");
  res.end();
})



try {/*следим за изменениями в эфире вещания JSON to ftp папке*/
fs.watchFile(FTPfileJSON, (curr, prev) => (curr.mtime.getTime() !== prev.mtime.getTime()? fromJSONtoLIVE() : null))
} catch (error) {log.log('error','not read json file')}


server.listen(env.SERVER_PORT, env.SERVER_HOST, () => log.log('info',`${colors.YELLOW}Server start:\n http://${env.SERVER_HOST}:${env.SERVER_PORT}${colors.WHITE}`))
serverSSL.listen(env.SERVER_PORT_SSL, env.SERVER_HOST, () => log.log('info',`${colors.YELLOW}Server start:\n https://${env.SERVER_HOST}:${env.SERVER_PORT_SSL}${colors.WHITE} \n`))

app.options('*', cors())

io.attach(server)
io.attach(serverSSL)


io.sockets.on('connection', function(socket) {
usersIp.push(socket.handshake.address)
DBselect(table, socket)
log.log('info',`${colors.GREEN}A user connected${colors.WHITE}`)

socket.on('disconnect', () => {
  usersIp.splice(socket.handshake.address, 1)
  log.log('info',`${colors.RED}A user disconnected${colors.WHITE}`)
})


socket.on('config', data => { 
  /* log.log('info',`${colors.RED}config request${colors.WHITE}`, data)*/
  if(data.hasOwnProperty('listStream') && !data.listStream.indexOf('delete'))
    DBdelete(data)
  else if(data.hasOwnProperty('listStream') && !data.listStream.indexOf('update'))
    DBupdate(data)
  else if(data.hasOwnProperty('listStream') && !data.listStream.indexOf('insert'))
    DBinsert(data)
  else
    DBupdate(data)
  
  DBselect(table)
})
})


DBselect(table)/*load db table*/
fromJSONtoLIVE()/*load from to start server*/