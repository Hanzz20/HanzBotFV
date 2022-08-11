let handler = async m => m.reply(` 
 🇰‌🇦‌🇷‌🇹‌🇺‌ 🇮‌🇳‌🇹‌🇷‌🇴‌

*＊✿❀°°°°°°°°°°°°°°°°°°°°❀✿＊*
□NIK                            :
□Nama                        :
□Tempat/Tgl Lahir   :
□Jenis Kelamin         :
□Gol Darah                 :
□Alamat                      :
  □RT/RW                    :
  □Kel/Desa                :
  □Kecamatan            :
□Agama                      :
□Status                       :
□Pekerjaan                 :
□Kewarganegaraan  :
□Berlaku Hingga       :
*＊✿❀°°°°°°°°°°°°°°°°°°°°❀✿＊*
 `.trim()) // Tambah sendiri kalo mau 
 handler.help = ['kertuintro'] 
 handler.tags = ['introcard'] 
 handler.command = /^introcard$/i 
 handler.register = false 
 handler.private = false 
  
 export default handler 
