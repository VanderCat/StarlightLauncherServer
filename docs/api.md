# Schema
## FileCache
```
{
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
```
# Api
## package.get [GET]
get info about package.

fields:
- name: string

response:
- package: object
    - name: string
    - files: FileCache[]