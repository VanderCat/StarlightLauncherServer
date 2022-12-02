import express from "express"
import errors from "../errors"

import { getCache } from "../../cache"
import config from "../../config"

export default function(req: express.Request, res: express.Response) {
    if (!req.body.name) {
        res.status(400)
        const error = {
            error: {
                name: errors.missingField.name,
                code: errors.missingField.code,
                cause: "name is required"
            }
        }
        res.json(error)
        return
    }
    let filter = false
    config.updateFolders.every((item)=>{
        filter = req.body.name == item
        return !filter
    })
    if (filter) {
        getCache(req.body.name).then((cache)=>{
            res.json({
                package: {
                    name: req.body.name,
                    files: cache
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
                cause: `${req.body.name} should not be cached on server`
            }
        }
        res.json(error)
        return
    }
}