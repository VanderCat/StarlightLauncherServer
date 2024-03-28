import config from "./config"

import fs from "fs-extra"
import Path from 'path'
import crypto from 'crypto'

const Cache:CacheHolder = {}

async function asyncForEach(array: Array<any>, callback:(v:any, i:number, arr:any[]) => Promise<any>) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function getAllFiles(dirPath: string, arrayOfFiles?: string[]) {
    let files = await fs.readdir(dirPath, {withFileTypes:true})

    arrayOfFiles = arrayOfFiles || []

    await asyncForEach(files, async (file) => {
        if (file.isDirectory()) {
            arrayOfFiles = await getAllFiles(dirPath + Path.sep + file.name, arrayOfFiles)
        } else {
            arrayOfFiles?.push(Path.join(dirPath, file.name))
        }
    })

    return arrayOfFiles
}

async function generateCache(path:string) {
    const buffer:Buffer = await fs.readFile(path)

    const sha256 = crypto.createHash('sha256')
    sha256.update(buffer)

    let cache:FileCache = {
        sha256: sha256.digest('hex'),
        path: Path.normalize(Path.relative(Path.join(process.cwd(), config.publicFolder), path)).replaceAll('\\', '/'),
        size: buffer.length
    }
    return cache
}

export async function generateDirectoryCache(path:string) {
    let _path = ""

    if (Path.isAbsolute(config.publicFolder)) {
        _path = config.publicFolder
    }
    else {
        _path = Path.join(config.publicFolder, path)
    }

    const absolutePath = Path.resolve(_path)

    const files = await getAllFiles(absolutePath)

    let cache: FileCache[] = []

    await asyncForEach(files, async (file)=> {
        cache.push(await generateCache(file))
    })

    const cachePath = Path.join(config.cacheFolder, Path.basename(path)+".json")

    await fs.ensureFile(cachePath)
    fs.writeFile(cachePath, JSON.stringify(cache), 'utf-8')
    console.log("Cached", path)
    return cache
}

export async function getCache(path:string) {
    const cacheName = Path.basename(path)
    if (Cache[cacheName] == undefined) {
        try {
            const cacheFile = await fs.readFile(Path.join(config.cacheFolder, cacheName+".json"), "utf-8")
            const cache = JSON.parse(cacheFile)
            Cache[cacheName] = cache
            return cache
        }
        catch (err:any) {
            if (err.code=="ENOENT") {
                const cache = generateDirectoryCache(Path.join("updates", path))
                Cache[cacheName] = cache
                return cache
            } else throw err
        }
    }
    else return Cache[cacheName]
}


export default {
    generateDirectoryCache,
    getCache
}