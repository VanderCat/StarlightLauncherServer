import express from "express"

const router = express.Router()
router.use(express.json())

import Package from "./package"
router.post("/package.get", Package.get)
router.post("/package.getJava", Package.getJava)

import Profiles from "./profiles"
router.post("/profiles.get", Profiles.get)
router.post("/profiles.list", Profiles.list)

export default router