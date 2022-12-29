let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, usedPrefix, text }) => {
  conn.req = conn.req || {}
  let [_, code, expired] = text.match(linkRegex) || []
  if(!code) return m.reply("Where Link grup?")

  let res = await conn.groupAcceptInvite(code)
  expired = expired*1

  m.reply(`Berhasil join grup ${res}${expired ? " selama " + expired + " jam" : ""}`).then(() => {
    let chats = global.db.data.chats[res]
    if(!chats) chats = global.db.data.chats[res] = {}
    if(expired) chats.expired = +new Date() + expired * 1000 * 60 * 60
  })
  let caption = `*${conn.getName(conn.user.jid)}* adalah bot WhatsApp yang dibangun dengan NodeJs, bot telah diundang oleh @${m.sender.split("@")[0]}${expired ? " selama " + expired + " jam" : ""} (Trial). Ketik /menu untuk melihat daftar fitur\n\n*Note:* _Jangan Spam Bot_`
  await conn.sendButton(res, caption, author, [
    ["Menu", ".menu"]
  ], m, {
    mentions: conn.parseMention(caption)
  })
}
handler.help = ["trial <chat.whatsapp.com>"]
handler.tags = ["owner"]

handler.command = /^trial$/i
handler.rowner = true

export default handler

const isNumber = (x) => (x = parseInt(x), typeof x === "number" && !isNaN(x))
