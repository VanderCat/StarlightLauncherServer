import express, { json } from "express"
import errors from "../errors"

import { getCache } from "../../cache"
import config from "../../config"
import fs from "fs-extra"

export default async function(req: express.Request, res: express.Response) {
    const file = await fs.readdir("profile")
    res.json(file)
}