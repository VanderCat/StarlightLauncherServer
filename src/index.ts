import config from "./config"
import express from "express"
import cors from "cors"
import api from "./api"

const app = express()

app.use(cors())
//app.options('*', cors())

app.use(express.static('public'))
app.use("/schema", express.static('schema'))
app.use("/api", api)

app.listen(config.port, () => {
    console.log(`Launcher Server listening on ${config.port}`)
})

import { getCache } from "./cache"
config.updateFolders.forEach((item)=>{
    getCache(item) //store cache in memory and generate it if needed (will not detect any chages regen it with api request)
})
getCache("../java")

import repl from "repl"
import cache from "./cache"
import path from "path"

try {
    let a = repl.start({
        eval: ()=>{},
        prompt: "mclauncher>"
    })
    a.defineCommand("cache", {
        help:"cache package agusha / cache java",
        async action(text) {
            this.clearBufferedCommand();
            const args = text.split(" ")
            const prefix = args.shift()
            if (!prefix) {
                console.log("need to provide cache type");
                this.displayPrompt()
                return;
            }
            if (prefix == "java") {
                try {
                    cache.Cache["java"] = await cache.generateDirectoryCache("java")
                } 
                catch (error) {
                    console.error(error)
                    this.displayPrompt()
                    return;
                }
            }
            else if (prefix == "package") {
                try {
                    const cacheName = "updates/"+args.join(" ")
                    cache.Cache[args.join(" ")] = await cache.generateDirectoryCache(cacheName)
                } 
                catch (error) {
                    console.error(error)
                    this.displayPrompt()
                    return;
                }
            }
            else {
                console.log("unknown cache type")
            }
            this.displayPrompt()
        }
    })
    a.defineCommand("exit", {
        help:"stops the server",
        async action(text) {
            process.exit()
        }
    })
} 
catch (error) {
    console.error(error)
}