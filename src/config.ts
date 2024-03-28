import { Config } from "../types/config";

export default {
    port: 3000,
    publicFolder: "public",
    cacheFolder: ".cache",
    adminSecret: "INEEDYOUTOCHANGEME",
    updateFolders: [
        //"1.19.2",
        "assets",
        "agusha"
    ],
    java: {
        location: "java",
        win32: {
            x64: {
                Java17: "graalvm-ce-java17-mustdie-x64"
            },
        },
        darwin: {
            //x64: {
            //    Java17: "graalvm-ce-java17-darwin-x64"
            //},
            arm64: {
                Java17: "graalvm-ce-java17-darwin-arm64"
            },
        },
        linux: {
            x64: {
                Java17: "graalvm-ce-java17-22.3.0-linux-x64"
            },
            //arm64: {
            //    Java17: "graalvm-ce-java17-linux-arm64"
            //},
        }
    }
} as Config