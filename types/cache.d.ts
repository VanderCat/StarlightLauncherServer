interface FileCache {
    /**
     * SHA256 Hash for file integrity check on client
     */
    sha256: string,
    /**
     * Path on server to download stuff
     */
    path: string,
    /**
     * Size of file
     */
    size: number
}
interface CacheHolder {
    [key: string]: any
}