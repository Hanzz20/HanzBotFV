export async function before(m) { 
   let id = m.chat 
   if(!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/「 TEBAK ANIME 」/i.test(m.quoted.text)) return 
   conn.tebakanime = conn.tebakanime ? conn.tebakanime : {} 
   if(m.text.includes("ahint")) return false 
   if(!(id in conn.tebakanime)) return m.reply("Soal itu telah berakhir") 
   if(m.quoted.id == conn.tebakanime[id][0].id) { 
     let json = JSON.parse(JSON.stringify(conn.tebakanime[id][1])) 
     if(m.text.toLowerCase() == json.name.toLowerCase()) { 
       global.db.data.users[m.sender].exp += conn.tebakanime[id][2] 
       m.reply(`*Jawaban Benar!*\n+${conn.tebakanime[id][2]} XP`) 
       clearTimeout(conn.tebakanime[id][3]) 
       delete conn.tebakanime[id] 
     } else if(m.text.toLowerCase().endsWith(json.name.split` `[1])) { 
       m.reply(`*Dikit Lagi!*`) 
     } else if(m.text.toLowerCase() == "nyerah") { 
       m.reply(`*Menyerah!*\n\nJawaban : ${json.name}`) 
       clearTimeout(conn.tebakanime[id][3]) 
       delete conn.tebakanime[id] 
     } else m.reply(`*Jawaban Salah!*`) 
   } 
 }
