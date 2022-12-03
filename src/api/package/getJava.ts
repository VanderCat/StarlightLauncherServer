import express from "express"
import _ from "lodash"

import errors from "../errors"

import { getCache } from "../../cache"
import config from "../../config"
import { JavaPlatform } from "../../../types/config"

export default function(req: express.Request, res: express.Response) {
    if (!req.body.java) {
        res.status(400)
        const error = {
            error: {
                name: errors.missingField.name,
                code: errors.missingField.code,
                cause: "java is required"
            }
        }
        res.json(error)
        return
    }
    if (!req.body.platform) {
        res.status(400)
        const error = {
            error: {
                name: errors.missingField.name,
                code: errors.missingField.code,
                cause: "platform is required"
            }
        }
        res.json(error)
        return
    }
    if (!req.body.arch) {
        res.status(400)
        const error = {
            error: {
                name: errors.missingField.name,
                code: errors.missingField.code,
                cause: "arch is required"
            }
        }
        res.json(error)
        return
    }
    const platform: NodeJS.Platform = req.body.platform
    const arch: NodeJS.Architecture = req.body.arch
    const availableArchs = config.java[platform]||{}//FIXME
    const availablePaths = availableArchs[arch]||{}//FIXME
    const javaPath = availablePaths["Java17"]||""//FIXME
    const filter = typeof javaPath == "string"
    if (filter) {
        getCache("../java").then((cache)=>{
            const filtered = _.filter(cache,(a)=>{
                return a.path.startsWith("java/"+javaPath)
            })
            res.json({
                package: {
                    java: req.body.javaPath,
                    files: filtered
                }
            })
        })
    }
    else {
        res.status(400)
        const error = {
            error: {
                name: errors.illegalPackageName.name,
                code: errors.illegalPackageName.code,
                cause: `${req.body.java} ${req.body.platform} ${req.body.arch} is not available on server`
            }
        }
        res.json(error)
        return
    }
}