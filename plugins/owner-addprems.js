import fs from "fs"
import ap from "awesome-phonenumber"

let handler = async function(m, { conn, text }) {
  let premi = JSON.parse(fs.readFileSync("data/premium.json"))
  let [jid, day] = text.split("|")
  day = day*1
  if(m.quoted) jid = m.quoted.sender

  if(!jid.endsWith("@s.whatsapp.net")) {
    let no = ap(jid)?.g?.number?.e164?.slice?.(1)

    if(jid.startsWith("@")) jid = m.mentionedJid[0]
    else if(no) jid = no + "@s.whatsapp.net"
    else return m.reply("Tag / balas pesan orang yang mau dijadikan premium")
  }
  if(new Date(Date.now() + (1000*60*60*24*day)) == "Invalid Date") return m.reply("Tanggal tidak valid :|")
  if(premi.some(v => v.jid == jid)) return m.reply("Dia sudah menjadi premium :|")

  premi.push({
    jid,
    from: Date.now(),
    to: new Date(Date.now() + (1000*60*60*24*day))
  })
  fs.writeFileSync("data/premium.json", JSON.stringify(premi, null, 2))

  m.reply(`Berhasil menambahkan @${jid.split("@")[0]} kedalam list premium selama ${day} hari`, null, {
    mentions: [jid]
  })
}

handler.help = ["prems", "prem", "premi", "premium"].map(v => "add" + v)
handler.tags = ["owner"]

handler.owner = true

handler.command = /^(add(prems?|premi(um)?))$/i

export default handler
