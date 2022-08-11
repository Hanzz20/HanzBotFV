let handler = m => m
 handler.all = async function (m, { isBlocked }) { 
     if (isBlocked) return

    let regs = /(ผิดุท้เึางืผิดุท้เึางื)/i
    let isVertexThai = regs.exec(m.text)
    if (isVertexThai && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }
    
    let regk = /(♚㜸ཽཽࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ͢͢㜺ࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣩࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧࣧ㜸ཽཽཽ͢͢͢♚)/i
    let isVertexSymbol = regk.exec(m.text)
    if (isVertexSymbol && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }
    
    let regp = /(111111)/i
    let isVertexsKontol = regp.exec(m.text)
    if (isVertexsKontol && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }
    
    let regh = /(๒๒๒๒๒๒๒๒)/i
    let isVertexNgentod = regh.exec(m.text)
    if (isVertexNgentod && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    let regl = /(666666)/i
    let isVertexBabi = regl.exec(m.text)
    if (isVertexBabi && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    let regu = /(777777)/i
    let isVertexPantek = regu.exec(m.text)
    if (isVertexPantek && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    let regy = /(888888)/i
    let isVertexUcok = regy.exec(m.text)
    if (isVertexUcok && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    let rego = /(999999)/i
    let isVertexGanteng = rego.exec(m.text)
    if (isVertexGanteng && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    let regd = /(๑๑๑๑๑๑๑)/i
    let isVertexGG = regd.exec(m.text)
    if (isVertexGG && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    let regt = /(৭৭৭৭৭৭৭)/i
    let isVertexNya = regt.exec(m.text)
    if (isVertexNya && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    let regf = /(1⃣•9⃣•4⃣•5⃣•)/i
    let isVertexPes = regf.exec(m.text)
    if (isVertexPes && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    let regq = /(𝙼𝙰𝚍𝚃𝙾𝙽𝚓𝙾𝙻)/i
    let isVertexLot = regq.exec(m.text)
    if (isVertexLot && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    let regw = /(꧁꧂)/i
    let isVertexMeg = regw.exec(m.text)
    if (isVertexMeg && !m.fromMe) {
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    }

    // tambahin sendiri code virus WhatsApp..
 }

export default handler
