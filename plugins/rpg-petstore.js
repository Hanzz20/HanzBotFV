let { MessageType } = (await import('@adiwajshing/baileys')).default 
  
 let handler  = async (m, { conn, command, args, usedPrefix, DevMode }) => { 
   let type = (args[0] || '').toLowerCase() 
   let _type = (args[0] || '').toLowerCase() 
   let user = global.db.data.users[m.sender] 
   global.db.data.users[m.sender].pickaxe = global.db.data.users[m.sender].pickaxe || 0 
   global.db.data.users[m.sender].pedang = global.db.data.users[m.sender].pedang || 0 
   global.db.data.users[m.sender].fishingrod = global.db.data.users[m.sender].fishingrod || 0 
    
   //----------HARGA 
   let hdog = 2 
   let hcat = 2 
   let hhorse = 4 
   let hfox = 6 
   let hrobo = 10 
  
 let logo = `— *P E T   S T O R E* — 
 ▮▧▧▧▧▧▧▧▧▧▧▧▧▮` 
 let caption = ` 
 🐈 *Cat:* ${hcat} 🔖 
 🐕 *Dog:* ${hdog} 🔖 
 🐎 *Horse:* ${hhorse} 🔖 
 🦊 *Fox:* ${hfox} 🔖 
 🤖 *Robo:* ${hrobo} 🔖 
  
 〉 *ABILITY* 
 Cooming soon...` 
 const sections = [ 
    { 
         title: "Buy A Pet", 
         rows: [ 
             {title: "Cat 🐈", rowId: ".petshop cat", description: "Adopt A Cat"}, 
             {title: "Dog 🐕", rowId: ".petshop dog", description: "Adopt A Dog"}, 
             {title: "Horse 🐎", rowId: ".petshop horse", description: "Adopt A Horse"}, 
             {title: "Fox 🦊", rowId: ".petshop fox", description: "Adopt A Fox"}, 
             {title: "Robo 🤖", rowId: ".petshop robo", description: "Buy A Robo"}, 
         ] 
     }, 
 ] 
  
 const listMessage = { 
   text: caption, 
   footer: wm, 
   title: logo, 
   buttonText: "ADOPT ME 🐾", 
   sections 
 } 
  
   try { 
     if (/petshop/i.test(command)) { 
       const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] || args.length < 3 ? 1 : Math.min(1, count) 
         switch (type) { 
           case 'cat': 
           if (user.cat > 0) return m.reply('Kamu sudah memilik ini') 
             if(user.pet < hcat) return m.reply(`Pet Token anda kurang`) 
             global.db.data.users[m.sender].pet -= hcat 
             global.db.data.users[m.sender].cat += 1 
             m.reply("Selamat anda mempunyai pet Baru ! 🎉") 
             break 
           case 'dog': 
           if (user.dog > 0) return m.reply('Kamu sudah memilik ini') 
             if(user.pet < hdog) return m.reply(`Pet Token anda kurang`) 
             global.db.data.users[m.sender].pet -= hdog 
             global.db.data.users[m.sender].dog += 1 
             m.reply("Selamat anda mempunyai pet Baru ! 🎉") 
             break 
           case 'fox': 
           if (user.fox > 0) return m.reply('Kamu sudah memilik ini') 
             if(user.pet < hfox) return m.reply(`Pet Token anda kurang`) 
             global.db.data.users[m.sender].pet -= hfox 
             global.db.data.users[m.sender].fox += 1 
             m.reply("Selamat anda mempunyai pet Baru ! 🎉") 
             break 
           case 'horse': 
           if (user.horse > 0) return m.reply('Kamu sudah memilik ini') 
             if(user.pet < hhorse) return m.reply(`Pet Token anda kurang`) 
             global.db.data.users[m.sender].pet -= hhorse 
             global.db.data.users[m.sender].horse += 1 
             m.reply("Selamat anda mempunyai pet Baru ! 🎉") 
             break 
           case 'robo': 
           if (user.robo > 0) return m.reply('Kamu sudah memilik ini') 
             if(user.pet < hrobo) return m.reply(`Pet Token anda kurang`) 
             global.db.data.users[m.sender].pet -= hrobo 
             global.db.data.users[m.sender].robo += 1 
             m.reply("Selamat anda mempunyai pet Baru ! 🎉") 
             break 
              
           default: 
             return await conn.sendMessage(m.chat, listMessage) 
         } 
     } else if (/enchant|enchan/i.test(command)) { 
       const count = args[2] && args[2].length > 0 ? Math.min(99999999, Math.max(parseInt(args[2]), 1)) : !args[2] || args.length < 4 ? 1 :Math.min(1, count) 
       switch (_type) { 
         case 't': 
           break 
         case '': 
           break 
  
         default: 
           return conn.sendButton( m.chat, caption, wm, null, [`⋮☰ Menu`, `.menu`], m) 
       } 
     } 
   } catch (err) { 
     m.reply("Error\n\n\n" + err.stack) 
   } 
 } 
  
 handler.help = ['petshop'] 
 handler.tags = ['rpg'] 
 handler.command = /^(petshop)/i 
  
 export default handler
