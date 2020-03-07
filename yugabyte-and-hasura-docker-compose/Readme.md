# Start yugabyte local cluster using docker compose
[Docs](https://docs.yugabyte.com/latest/deploy/docker/docker-compose/)

```
docker-compose -f ./docker-compose.yaml up -d
```

This will start Yugabyte and Hasura

```
cd hasura 
hasura migrate apply
```

To remove everything:

```
docker-compose down

docker system prune --volumes

```