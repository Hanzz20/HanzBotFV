import axios from "axios"
import cheerio from"cheerio"
import fetch from "node-fetch"
import https from "https"

function convertAngka(number) {
    const data = String(number).split("").reverse()
    let combine = ""
    for (let i = 0; i < data.length; i++) {
        if ((i + 1) % 3 == 0 && i != data.length - 1) {
            data[i] = `.${data[i]}`
        }
    }
    combine = `${data.reverse().join("")}`
    return combine
}

async function facebook(url) {
    return new Promise((resolve, reject) => {
        axios({
            url: "https://aiovideodl.ml/",
            method: "GET",
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"
            }
        }).then((src) => {
            let a = cheerio.load(src.data)
            let token = a("#token").attr("value")
            axios({
                url: "https://aiovideodl.ml/wp-json/aio-dl/video-data/",
                method: "POST",
                headers: {
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                    "cookie": "PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653"   
                },
                data: new URLSearchParams(Object.entries({ "url": link, "token": token }))
            }).then(({ data }) => {
                resolve(data)
            })
        })
    })
}

async function zippydl(urls) {
    return new Promise((resolve, reject) => {
        axios.get(urls).then(({ data }) => {
            const $ = cheerio.load(data)

            let e
            try {
              e = cheerio.load(cheerio.load($("div#lrbox > div").html())("div")[1]).text()
            } catch {
            }
            if(e) {
              if(e.length && e.length < 50) reject(e)
            }

            const li = $.html()
            const po = $("#dlbutton").next().html()
            const le = po.split(";")[0]
            const lo = le.split("document.getElementById('dlbutton').href =")[1]
            const result = `${urls.split("/v")[0]}${eval(lo)}`
            const ho = $("#lrbox").text().replace(/\n/g, "")
            const ext = ho.split("Name:")[1].split("Size:")[0].split(".")[1]
            const hasil = {
                title: ho.split("Name:")[1].split("Size:")[0].trim(),
                extension: ext,
                filesize: ho.split("Size:")[1].split("Uploaded:")[0].trim(),
                upload: ho.split("Uploaded:")[1].split("          ")[0].trim(),
                link: result
            }
            resolve(hasil)
        }).catch(reject)
    })
}


async function trustpositif(url) {
  if(!url) return false
  let agent = new https.Agent({ rejectUnauthorized: false })
  url = Array.isArray(url) ? encodeURIComponent(url.join("\n")) : url
  let { data } = await axios({
    "url": "https://trustpositif.kominfo.go.id/Rest_server/getrecordsname_home",
    "method": "POST",
    "httpsAgent": agent,
    "data": {
      "name": url,
    }
  })
  let result = {}
  for(let i of data.values) {
    result[i.Domain] = i.Status === "Ada"
  }
  return result
}

/*async function lyric(search) {
  search = search.trim()
  let { data } = await axios.get("https://www.google.com/search?q=lirik%20" + encodeURIComponent(search) + "&hl=id", {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
    }
  })
  let $ = cheerio.load(data)
  let result = { creator: null, title: null, lyrics: null }
  result.creator = $("#rso > div:nth-child(2) > div > block-component > div > div.dG2XIf.EyBRub.Wnoohf.OJXvsb > div.L29P6c > div > div > div.ifM9O > div > div > div.kp-header > div.kp-hc > div > div > div > h2 > span").text()
  result.title = $("#rso > div:nth-child(2) > div > block-component > div > div.dG2XIf.EyBRub.Wnoohf.OJXvsb > div.L29P6c > div > div > div.ifM9O > div > div > div.kp-header > div.kp-hc > div > div > div > div > span > a").text()
  result.lyrics = $("#rso > div:nth-child(2) > div > block-component > div > div.dG2XIf.EyBRub.Wnoohf.OJXvsb > div.L29P6c > div > div > div.ifM9O > div > div > div.SALvLe.farUxc.mJ2Mod > div > div > div > div > div.Oh5wg.YB98bd > div.PZPZlf.ruFbjf > div:nth-child(2)").find("br").replaceWith("\n").end().text()
  if(!result.lyrics) return { status: 404, message: "Lyrics not found!" }
  return result
}*/

async function lyric(search) {
  search = search.trim()
  let { data } = await axios("https://www.google.com/search?q=" + encodeURIComponent(search) + "%20lirik")
  let $ = cheerio.load(data)
  let result = { creator: null, title: null, lyrics: null }
  result.creator = $($("span.BNeawe.s3v9rd.AP7Wnd").get(1)).text()
  result.title = $("span.BNeawe.tAd8D.AP7Wnd").text()
  result.lyrics = $($("div.BNeawe.tAd8D.AP7Wnd").get(3)).text()
  if(!result.lyrics) return { status: 404, message: "Lyrics not found!" }
  return result
}

async function coc(id = "") {
  let url = "https://api.clashofstats.com/players/" + (id.startsWith("#") ? id.replace("#", "") : id)
  let data
  try {
    data = (await axios(url)).data
  } catch(err) {
    return err?.response?.data
  }

  return data
}

async function infoGempa() {
  let { data } = await axios.get("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json")

  let img = await (await fetch("https://data.bmkg.go.id/DataMKG/TEWS/" + data.Infogempa.gempa.Shakemap)).buffer()
  let result = {
    creator: "Restu",
    source: "BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)",
    result: {
      img
    }
  }

  for(let i in data.Infogempa.gempa) {
    if(i == "Shakemap") continue
    result.result[i.toLowerCase()] = data.Infogempa.gempa[i]
  }

  return result
}


export {
  facebook,
  zippydl,
  trustpositif,
  lyric,
  coc,
  infoGempa
}


import { watchFile, unwatchFile } from "fs"
import { fileURLToPath } from "url"
import chalk from "chalk"

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  //console.log(chalk.redBright("Update \"scrape.js\""))
  import(`${file}?update=${Date.now()}`)
})
