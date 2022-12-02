import config from "./config"
import express from "express"
import cors from "cors"
import api from "./api"

const app = express()

app.use(cors())
app.options('*', cors())

app.use(express.static('public'))
app.use("/schema", express.static('schema'))
app.use("/api", api)

app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
})

import { getCache } from "./cache"
config.updateFolders.forEach((item)=>{
    getCache(item) //store cache in memory and generate it if needed (will not detect any chages regen it with api request)
})
getCache("../java")