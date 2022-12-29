import { watchFile, unwatchFile } from "fs"
import chalk from "chalk"
import { fileURLToPath } from "url"
import fs from "fs"

/**Owner number**/
global.owner = [
  ["6281537442307", "Hanz", true],
  ["6285783417029", "Restu", true, "muhammadrestu490@gmail.com", "https://rstu.up.railway.app/"],
]
  // [number, name, dia developer?]
  // Put your number here

global.mods = JSON.parse(fs.readFileSync("data/mods.json")) // Mods
global.prems = JSON.parse(fs.readFileSync("data/premium.json")) // Premium

global.girlfren = undefined // Your girlfriend

//Api website
global.APIs = { // API Prefix
  // name: "https://website"
  nrtm: "https://nurutomo.herokuapp.com",
  bg: "http://bochil.ddns.net",
  xteam: "https://api.xteam.xyz",
  zahir: "https://zahirr-web.herokuapp.com",
  zeks: "https://api.zeks.xyz",
  pencarikode: "https://pencarikode.xyz",
  LeysCoder: "https://leyscoders-api.herokuapp.com",
  zenz: "https://zenzapis.xyz",
  caliphapi: "https://caliphapi.me",
  dvanzapi: "https://dvanzapi.my.id"
}
global.APIKeys = { // APIKey Here
  // "https://website": "apikey"
  "https://api.xteam.xyz": "d90a9e986e18778b",
  "https://zahirr-web.herokuapp.com": "zahirgans",
  "https://api.zeks.xyz": "apivinz",
  "https://pencarikode.xyz": "pais",
  "https://leyscoders-api.herokuapp.com": "dappakntlll",
  "https://zenzapis.xyz": "BagasPrdn",
  "https://caliphapi.me": "WKuBEyKx",
  "https://dvanzapi.my.id": "<kosong>"
}

// Sticker WM
global.packname = "Created By HanzBot"
global.author = "Hanz"
global.wm = "HanzBot"
global.multiplier = 69 // The higher, The harder levelup

//
global.eror = "Error bang"
global.wait = "⏳ | Please wait..."
global.render = "wait render"
global.webs = "https://github.com/Hanzz20" //Your Website
global.logo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKsHEAITWM7dPQ_irYtNvZ1hiM_zj4tZ4f6A&usqp=CAU"//Your logo
global.gcwangsaf = "https://chat.whatsapp.com/I8ZuTtwlyzcH0vFS6BJcxP" //Link Group whatsapp

//Donasi
global.saweria = "Gapunya" // website saweria.co
global.dana = "081537442307" // dana here
global.pulsa = "081537442307" // pulsa here
global.gopay = "081537442307" // number for Payment digital Gopay Gojek


//Rpg
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase()
    let emot = {
      level: "🧬",
      limit: "🌌",
      health: "❤️",
      strength: "🦹‍♀️",
      mana: "🪄",
      stamina: "⚡",
      agility: "🤸‍♂️",
      intelligence: "🧠",
      exp: "✉️",
      pointxp: "📧",
      money: "💵",
      bank: "🏦",
      potion: "🥤",
      gems: "🍀",
      crystal: "🔮",
      diamond: "💎",
      darkcrystal: "♠️",
      common: "📦",
      uncommon: "🎁",
      mythic: "🗳️",
      legendary: "🗃️",
      pet: "🎁",
      trash: "🗑",
      armor: "🥼",
      sword: "🗡️",
      fishingrod: "🎣",
      pickaxe: "⛏️",
      arc: "🏹",
      bow: "🏹",
      magicwand: "⚕️",
      keyiron: "🗝️",
      keygold: "🔑",
      knife: "🔪",
      wood: "🪵",
      rock: "🪨",
      string: "🕸️",
      horse: "🐎",
      cat: "🐈",
      dog: "🐕",
      fox: "🦊",
      cow: "🐄",
      bull: "🐃",
      tiger: "🐅",
      lion: "🦁",
      giraffe: "🦒",
      elephant: "🐘",
      snake: "🐍",
      dragon: "🐉",
      chicken: "🐓",
      petFood: "🍖",
      iron: "⛓️",
      gold: "👑",
      emerald: "💚"
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, "gi")]).filter(v => v[1].test(string))
    if (!results.length) return ""
    else return emot[results[0][0]]
  }
}


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update \"config.js\""))
  import(`${file}?update=${Date.now()}`)
})

watchFile("data/mods.json", () => {
  console.log(chalk.redBright("Update \"data/mods.json\""))
  global.mods = JSON.parse(fs.readFileSync("data/mods.json"))
})
watchFile("data/premium.json", () => {
  console.log(chalk.redBright("Update \"data/premium.json\""))
  global.prems = JSON.parse(fs.readFileSync("data/premium.json"))
})
