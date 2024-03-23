import express from "express"
import fs from "fs-extra"
import path from "path"

import errors from "../errors"
const articles: {[key:string]:string} = {}

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
    if (!articles[req.body.name])
        articles[req.body.name] = fs.readFileSync(path.resolve(process.cwd(), "articles", req.body.name+".md"), "utf-8")
    res.contentType(".md").send(articles[req.body.name])
}