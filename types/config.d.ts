import os from 'os'

interface Config {
    [key: string]: any,
    port: number,
    publicFolder: string,
    cacheFolder: string,
    adminSecret: string,
    updateFolders: string[],
    java: JavaPaths
}
interface JavaPaths {
    [key: string]: JavaPlatform,
    location: "java",
    win32?: JavaPlatform,
    darwin?: JavaPlatform,
    linux?: JavaPlatform
}
interface JavaPlatform {
    [key: string]: JavaVersion,
    x86?: JavaVersion
    x64?: JavaVersion,
    arm64?: JavaVersion,
    arm32?: JavaVersion,
}
interface JavaVersion { // i bet there's better way
    [key: string]: string,
    Java8?: string,
    Java9?: string
    Java10?: string
    Java11?: string
    Java12?: string
    Java13?: string
    Java14?: string
    Java15?: string
    Java16?: string
    Java17?: string
    Java18?: string
    Java19?: string
}