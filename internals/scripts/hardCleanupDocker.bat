docker stop sso-gateway
docker rm sso-gateway
docker rmi sso-gateway
docker stop sso-gateway-postgres
docker rm sso-gateway-postgres
docker rmi sso-gateway-postgres
docker stop sso-gateway-redis
docker rm sso-gateway-redis
docker rmi sso-gateway-redis
docker stop sso-gateway-test
docker rm sso-gateway-test
docker rmi sso-gateway-test
docker stop sso-gateway-postgres-test
docker rm sso-gateway-postgres-test
docker rmi sso-gateway-postgres-test
del %~dp0..\..\node_modules
rmdir /Q /s %~dp0..\..\node_modules
rmdir /Q /s %~dp0..\..\build
del /Q /s %~dp0..\..\*.gzip
