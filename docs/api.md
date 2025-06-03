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

## package.cache [GET]
get cached file

fields:
- name: string

response:
- package: object
    - name: string
    - files: FileCache[]

## articles.get [GET]
get article contents.

fields:
- name: string

response:
- markdown document

## articles.cache [GET]
get all article id's

fields:
- none

response
- string[]