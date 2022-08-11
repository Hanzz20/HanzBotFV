let handler = async function(m) { 
   let id = m.chat 
   if(!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/「 TEBAK ANIME 」/i.test(m.quoted.text)) return 
   conn.tebakanime = conn.tebakanime ? conn.tebakanime : {} 
   if(m.text.toLowerCase() == "nyerah") return false 
   if(id in conn.tebakanime === false) return false 
   if(m.quoted.id == conn.tebakanime[id][0].id) { 
     let json = JSON.parse(JSON.stringify(conn.tebakanime[id][1])) 
     let clue = json.name.replace(/[bcdfghjklmnpqrstvwxyz]/g, "_") 
     console.log(json.name) 
     m.reply("```" + clue + "```") 
   } 
   return !0 
 } 
  
 handler.help = ["ahint"] 
 handler.tags = ["tebakanime"] 
 handler.command = /^ahint$/i 
 handler.exp = 0 
 export default handler
