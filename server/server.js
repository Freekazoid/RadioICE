const colorC = {
    WHITE: "\033[39m",   //белый
    RED:'\033[0;31m',     //красный
    GREEN:'\033[0;32m',   //зелёный
    YELLOW:'\033[0;33m',  //желтый
    BLUE:'\033[0;34m',    //синий
    MAGENTA:'\033[0;35m', //фиолетовый
    CYAN:'\033[0;36m',    //цвет
    GRAY:'\033[0;37m',    //серый
  },
  table = ['admin', 'header', 'footer', 'radio', 'newitem', 'programs', 'icehot', 'team', 'life', 'playlist', 'video'],
  env = require('dotenv').config().parsed,
  app = require('express')(),
  mime = require('mime'),//////
  fs  = require('fs'),
  itunesAPI = require("node-itunes-search"),
  iconv = require('iconv-lite'),
  mysql = require('mysql2/promise'),
  server = require('http').createServer(app),
  serverSSL = require('https').createServer({
      key: fs.readFileSync(env.SERVER_KEY),
      cert: fs.readFileSync(env.SERVER_CERT),
      ca: fs.readFileSync(env.SERVER_CA),
      requestCert: false,
      rejectUnauthorized: false,
    }, app),
  io = require('socket.io')(server, {
    key: fs.readFileSync(env.SERVER_KEY),
    cert: fs.readFileSync(env.SERVER_CERT),
    ca: fs.readFileSync(env.SERVER_CA),
    secure: true,
    wsEngine:	env.IO_ENGINE,
    serveClient: env.IO_SERVER_CLIENT,
    pingInterval: env.IO_PING_INTERVAL,
    pingTimeout: env.IO_PING_TIMEOUT,
    cookie: env.IO_COOKIE,
  }),
  usersRespons = (data, events, id=false) => {
    id === false? (io.emit(events, data)) : (io.sockets.connected[id].emit(events, data))
    console.log(`${colorC.WHITE}usersRespons,  events: ${events} id: ${id}`)
  },
  searchItunes = async (serch) => {
    const result = await itunesAPI.searchItunes({
      term: serch,
      limit: 1
    })
    return result.results[0].artworkUrl100
  },
  XMLtoJSON = async () => {
    const file = await iconv.decode(Buffer.from(fs.readFileSync('ftp/cur_playing.xml')), 'CP1251').replace('/\s{2,}/g', ''),
        type = file.match(/(?<=<(BLK_TYPE)>)(?<BLK_TYPE>.*?)(?=<\/BLK_TYPE>)/gm),
        name = file.match(/(?<=<(NAME)>)(?<NAME>.*?)(?=<\/NAME>)/gm),
        artist = file.match(/(?<=<(ARTIST)>)(?<ARTIST>.*?)(?=<\/ARTIST>)/gm),
        duration = file.match(/(?<=<(DURATION)>)(?<DURATION>.*?)(?=<\/DURATION>)/gm)

    if(type && name && artist && duration){
      const art = artist[0].replace('&amp;', ''),
        image = await searchItunes(`${name[0]}`),
        data = {
          type: type[0],
          name: name[0],
          artist: art,
          duration: duration[0],
          img: ( typeof image !== 'undefined'?image : 'onlineImg.png')
        }
      
      tableDB.stream = (typeof tableDB.stream !== 'object')? new Object : tableDB.stream

      if(JSON.stringify(tableDB.stream.streamLive) !== JSON.stringify(data)){
        console.log( data )

        tableDB.stream.streamLive = data
        usersRespons(tableDB, 'response')
      }
    }
  },
  getNormalizeObj = (obj) => {
    let result = {}, iterator
    (iterator = (o) => {
      for(var i in o) {
        if(o[i].hasOwnProperty('0') && !o[i].hasOwnProperty('1')) {
          o[i] = o[i][0]
          if(typeof o[i] === 'object' && typeof o[i] !== 'array')
            iterator(o[i])
        } else if(o[i].hasOwnProperty('0') && o[i].hasOwnProperty('1') && typeof o[i] === 'object')
          o[i] = Object.values(o[i])
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
    }).catch( e => console.log(e) ),
      table = Object.keys(data)
      for(t in table) {
        const rows = Object.keys(data[table[t]])
        for(r in rows) {
          const value = (typeof data[table[t]][rows[r]] === 'object'? (data[table[t]][rows[r]].reduce((acc, cur, i) => { acc[i] = cur; return acc; }, {})) : data[table[t]][rows[r]]),
          valueToString = (typeof data[table[t]][rows[r]] === 'object'? JSON.stringify(value) : value),
          [row, fields] = await connect.execute(`UPDATE _${table[t]} SET ${rows[r]}=?`, [valueToString])
          //console.log( `UPDATE _${table[t]} SET ${rows[r]}=?`, [valueToString] )
        }
      }
    connect.end()
  },
  DBselect = async (table, socket=false) => {
    const connect = await mysql.createConnection({
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      port: env.DB_PORT,
      host: env.DB_HOST,
      database: env.DB_DATABASE,
    }).catch( e => console.log(e) )

    for (i in table) {
      const item = table[i],
        [row, fields] = await connect.execute(`SELECT * FROM _${item}`)
      
      tableDB[item] = row
    }
    tableDB = getNormalizeObj(tableDB)
    //console.log( tableDB )
    
    usersRespons(tableDB, 'response', socket.id)
    connect.end()
  }

  
let tableDB = {},
  usersIp = []


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.post('/', (req, res) => {
  res.json({
    id: Object.keys(io.sockets.clients().connected),
    ip: usersIp,
    count: Array.from(Object.keys(io.sockets.clients().connected)).length
  })
})

app.get('/', (req, res) => {
  res.json({
    id: Object.keys(io.sockets.clients().connected),
    ip: usersIp,
    count: Array.from(Object.keys(io.sockets.clients().connected)).length
  })
})








io.attach(server)
io.attach(serverSSL)

server.listen(env.SERVER_PORT, env.SERVER_HOST, () => console.log(`${colorC.BLUE}Server start:\n http://${env.SERVER_HOST}:${env.SERVER_PORT}${colorC.WHITE}`))
serverSSL.listen(env.SERVER_PORT_SSL, env.SERVER_HOST, () => console.log(`${colorC.BLUE}Server start:\n https://${env.SERVER_HOST}:${env.SERVER_PORT_SSL}${colorC.WHITE} \n`))

io.sockets.on('connection', function(socket) {
  usersIp.push(socket.handshake.address)
  DBselect(table, socket)
  console.log(`${colorC.GREEN}A user connected${colorC.WHITE}`)
  

  socket.on('disconnect', () => {
    usersIp.splice(socket.handshake.address, 1)
    console.log(`${colorC.RED}A user disconnected${colorC.WHITE}`)
  })
  
  
  socket.on('config', data => {
    DBupdate(data, socket)
    DBselect(table)
  })

  setInterval(() => XMLtoJSON(), 500)
})