import express from "express"
import errors from "../errors"

import { getCache } from "../../cache"
import config from "../../config"
import fs from "fs-extra"

export default async function(req: express.Request, res: express.Response) {
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
    if (await fs.pathExists("profile/"+req.body.name)) {
    const file = await fs.readFile("profile/"+req.body.name, 'utf-8')
    res.type("yaml")
    res.send(file)
    }
    else {
        res.status(400)
        const error = {
            error: {
                name: errors.illegalPackageName.name,
                code: errors.illegalPackageName.code,
                cause: `profile ${req.body.name} is not exists on the server`
            }
        }
        res.json(error)
        return
    }
}