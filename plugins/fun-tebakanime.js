import fetch from "node-fetch" 
  
 let timeout = 60000 
 let poin = 25000 
  
 let handler  = async (m, { conn, usedPrefix }) => { 
   conn.tebakanime = conn.tebakanime ? conn.tebakanime : {} 
  
   let id = m.chat 
   if(id in conn.tebakanime) return conn.reply(m.chat, "Masih ada soal belum terjawab di chat ini", conn.tebakanime[id][0]) 
  
   let res = await fetch("http://zekais-api.herokuapp.com/tebakanime") 
   if(res.status !== 200) throw await res.text() 
  
   let json = await res.json() 
   if(json.status != 200) throw json.message || json 
  
   let caption = `「 TEBAK ANIME 」\n\nWaktu : ${(timeout / 1000).toFixed(2)} Detik\nBonus : ${poin} XP\n\nKetik *${usedPrefix}ahint* untuk bantuan\nKetik *nyerah* untuk menyerah` 
   conn.tebakanime[id] = [ 
     await conn.sendFile(m.chat, json.image, null, caption, m), 
     json, 
     poin, 
     setTimeout(() => { 
       if(conn.tebakanime[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.name}*\n\nUrl : ${json.url}\nDesk :\n${json.desc}`, conn.tebakanime[id][0]) 
       delete conn.tebakanime[id] 
     }, timeout) 
   ] 
 } 
  
 handler.help = ["tebakanime"] 
 handler.tags = ["game"] 
 handler.command = /^tebakanime$/i 
  
 export default handler
