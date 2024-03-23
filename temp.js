const yaml = require("yaml")
const fs = require("fs-extra")
const path = require("path")

const list = JSON.parse(fs.readFileSync(process.argv[2]))
const filteredList = {}
for (const mod in list.launcher.mods) {
    if (Object.hasOwnProperty.call(list.launcher.mods, mod)) {
        const modinfo = list.launcher.mods[mod];
        filteredList[modinfo.name] = {}
        const filteredInfo = filteredList[modinfo.name]
        filteredInfo.optional = modinfo.optional
        filteredInfo.description = modinfo.description
        filteredInfo.enabled = !modinfo.disabled
        filteredInfo.visible = true
        filteredInfo.file = modinfo.path+path.sep+modinfo.file+":"+modinfo.path+path.sep+modinfo.file
    }
}
console.log(yaml.stringify(filteredList))