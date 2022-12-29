process.env["NODE_TLS_REJECT_UNAUTHO]RIZED"] = "0";
import "./config.js";

import { createRequire } from "module"; // Bring in the ability to create the "require" method
import path, { join } from "path"
import { fileURLToPath, pathToFileURL } from "url"
import { platform } from "process"
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== "win32") { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }

import * as ws from "ws";
import {
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch
} from "fs";
import yargs from "yargs";
import { spawn } from "child_process";
import lodash from "lodash";
import syntaxerror from "syntax-error";
import { tmpdir } from "os";
import { format } from "util";
import { makeWASocket, protoType, serialize } from "./lib/simple.js";
import { Low, JSONFile } from "lowdb";
// import pino from "pino";
import {
  mongoDB,
  mongoDBV2
} from "./lib/mongoDB.js";
import store from "./lib/store.js"
import schedule from "node-schedule"
import fetch from "node-fetch"
import crypto from "crypto"
const {
  DisconnectReason,
  extractImageThumb
} = await import("@adiwajshing/baileys")


const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = "/", query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? "?" + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : "")
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.opts2 = Object.fromEntries(Object.entries(opts).filter(v => v[0] != "_" && v[0] != "$0"))
global.prefix = /^[/.!?¿‽\+\-#]/

if(Object.keys(opts2).length > 0) {
  let text = "\t\t\tOptions\n\n"
  for(let i in opts2) text += `${i}: ${opts2[i]}\n`
  console.log(text)
}

// global.opts["db"] = process.env["db"]

global.db = new Low(
  /https?:\/\//.test(opts["db"] || "") ?
    new cloudDBAdapter(opts["db"]) : /mongodb(\+srv)?:\/\//i.test(opts["db"]) ?
      (opts["mongodbv2"] ? new mongoDBV2(opts["db"]) : new mongoDB(opts["db"])) :
      new JSONFile(`${opts._[0] ? opts._[0] + "_" : ""}database.json`)
)


global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!global.db.READ) {
      clearInterval(this)
      resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
    }
  }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()

global.authFile = `${opts._[0] || "session"}.data.json`
const { state, saveState } = store.useSingleFileAuthState(global.authFile)

const connectionOptions = {
  printQRInTerminal: true,
  auth: state,
  // logger: pino({ level: "trace" })
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (!opts["test"]) {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

  let { getAge } = (await import("./lib/function.js")).default
  let rule = new schedule.RecurrenceRule()
  rule.second = 0
  schedule.scheduleJob("save_db", rule, async () => {
      conn.logger.info("Menyimpan database")
    if (global.db.data) await global.db.write().then(() => {
      conn.logger.info("Sukses menyimpan database")
    }).catch(e => {
      conn.logger.error("Gagal menyimpan database")
      console.error(e)
    })
    if (opts["autocleartmp"]) try {
      clearTmp()
    } catch (e) { console.error(e) }
  })
  schedule.scheduleJob("ultah", rule, async() => {
    try {
      if(!global.db.data) return
      if(new Date().getHours() < 6 || new Date().getHours() > 18) return

      let ultah = []
      for(let i in global.db.data.users) {
        if(global.db.data.users[i].lahir && global.db.data.users[i].last_ultah != new Date().getFullYear()) ultah.push(i)
      }
      ultah = ultah.filter(v => {
        let now = new Date
        let ulth = new Date(global.db.data.users[v].lahir)

        return now.getDate() == ulth.getDate() && now.getMonth() == ulth.getMonth()
      })

      for(let jid of ultah) {
        let info = getAge(global.db.data.users[jid].lahir)
        if(!info.isBirthday) return

        let hadiah = {
          money: 100_000_000,
          exp: 1_000_000,
          limit: 100
        }
        global.db.data.users[jid].age = getAge(global.db.data.users[jid].lahir).age
        global.db.data.users[jid].last_ultah = new Date().getFullYear()
        for(let i in hadiah) global.db.data.users[jid][i] += hadiah[i]

        let img = await baileys.extractImageThumb(await (await fetch("https://telegra.ph/file/f5cb9e1bef11d9473b031.jpg")).buffer(), 300)

        await conn.sendMessage(jid, {
          text: `
Selamat ulang tahun yang ke *${info.age}* @${jid.split("@")[0]}!
Hadiah ulang tahun dari bot :
${Object.entries(hadiah).map(v => "- " + v[0] + " " + v[1].toLocaleString("id")).join("\n")}
`,
          mentions: [jid]
        }, {
          quoted: {
            key: {
              id: crypto.randomBytes(16).toString("hex").toUpperCase(),
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast"
            },
            message: {
              imageMessage: {
                caption: `Selamat ulang tahun ${global.db.data.users[jid].name}!`,
                jpegThumbnail: img.buffer,
              }
            }
          }
        })
        await delay(1500)
      }
    } catch(e) { console.error(e) }
  })
}
if (opts["server"]) (await import("./server.js")).default(global.conn, PORT)


function clearTmp() {
  const tmp = [join(__dirname, "./tmp")]
  const filename = []
  tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
  return filename.map(file => {
    const stats = statSync(file)
    if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutes
    return false
  })
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
  if (code === 403) {
    console.log("\n".repeat(15), "Bot kebanned!")
    spawn("pm2", ["stop", "wa"])
    return
  }
  if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== CONNECTING) {
    console.log(await global.reloadHandler(true).catch(console.error))
    global.timestamp.connect = new Date
  }
  if (global.db.data == null) loadDatabase()
}


process.on("uncaughtException", console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

let isInit = true;
let handler = await import("./handler.js")
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) {
    console.error(e)
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch { }
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off("messages.upsert", conn.handler)
    conn.ev.off("group-participants.update", conn.participantsUpdate)
    conn.ev.off("groups.update", conn.groupsUpdate)
    conn.ev.off("message.delete", conn.onDelete)
    conn.ev.off("connection.update", conn.connectionUpdate)
    conn.ev.off("creds.update", conn.credsUpdate)
  }

  conn.welcome = "Hai, @user!\nSelamat datang di grup @subject"
  conn.bye = "Selamat tinggal @user!"
  conn.spromote = "@user sekarang admin!"
  conn.sdemote = "@user sekarang bukan admin!"
  conn.sDesc = "Deskripsi telah diubah ke \n@desc"
  conn.sSubject = "Judul grup telah diubah ke \n@subject"
  conn.sIcon = "Icon grup telah diubah!"
  conn.sRevoke = "Link group telah diubah ke \n@revoke"
  conn.handler = handler.handler.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveState.bind(global.conn, true)
  conn.onCall = handler.onCall.bind(global.conn)

  conn.ev.on("messages.upsert", conn.handler)
  conn.ev.on("group-participants.update", conn.participantsUpdate)
  conn.ev.on("groups.update", conn.groupsUpdate)
  conn.ev.on("message.delete", conn.onDelete)
  conn.ev.on("connection.update", conn.connectionUpdate)
  conn.ev.on("creds.update", conn.credsUpdate)

  conn.ws.on("CB:call", conn.onCall)
  isInit = false
  return true
}

const pluginFolder = global.__dirname(join(__dirname, "./plugins/index"))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      let file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit().then(_ => console.log(Object.keys(global.plugins))).catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - "${filename}"`)
      else {
        conn.logger.warn(`deleted plugin - "${filename}"`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`new plugin - "${filename}"`)
    let err = syntaxerror(readFileSync(dir), filename, {
      sourceType: "module",
      allowAwaitOutsideFunction: true
    })
    if(err) {
      conn.logger.error(`syntax error while loading "${filename}"\n${format(err)}`)
      for(let i of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) conn.sendMessage(i[0] + "@s.whatsapp.net", {
        text: format(err)
      })
    } else try {
      const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(`error require plugin "${filename}\n${format(e)}"`)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

// Quick Test
async function _quickTest() {
  let test = await Promise.all([
    spawn("ffmpeg"),
    spawn("ffprobe"),
    spawn("ffmpeg", ["-hide_banner", "-loglevel", "error", "-filter_complex", "color", "-frames:v", "1", "-f", "webp", "-"]),
    spawn("convert"),
    spawn("magick"),
    spawn("gm"),
    spawn("find", ["--version"])
  ].map(p => {
    return Promise.race([
      new Promise(resolve => {
        p.on("close", code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
        p.on("error", _ => resolve(false))
      })
    ])
  }))
  let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  console.log(test)
  let s = global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find
  }
  // require("./lib/sticker").support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn("Please install ffmpeg for sending videos (pkg install ffmpeg)")
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn("Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)")
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn("Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)")
}

_quickTest()
  .then(() => conn.logger.info("Quick Test Done"))
  .catch(console.error)
