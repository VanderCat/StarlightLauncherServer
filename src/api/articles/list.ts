import express from "express"
import yaml from "yaml"
import fs from "fs-extra"
import path from "path"

export default function(req: express.Request, res: express.Response) {
    const list = yaml.parse(fs.readFileSync(path.resolve(process.cwd(), "articles", "index.yml"), "utf-8"))
    res.json(list)
}