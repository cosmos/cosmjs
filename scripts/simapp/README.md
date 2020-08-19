# Local Simd development network

## Starting the blockchain

Run the following:

```
cd scripts/simapp
./start.sh
```


## Useful commands
* Docker
`docker ps` - shows container status and id
`docker exec -it simapp sh` open terminal on container

* Inside the container
`simd q ibc connection connections` list connections
`simd q ibc channel channels` list channels
