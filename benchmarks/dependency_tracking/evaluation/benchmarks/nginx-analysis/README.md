## Incremental Development Details

`nginx-1.sh`: find (1) broken links, (2) who are requesting broken links, (3) most requested URLs and those containing XYZ

`nginx-2.sh`: further finds broken liks (404) for php files---mostly hacking attempts

`nginx-3.sh`: further find 502 (bad-gateway) requests