docker stop sso-gateway
docker rm sso-gateway
docker rmi sso-gateway
docker stop sso-gateway-pg
docker rm sso-gateway-pg
docker rmi sso-gateway-pg
rmdir /Q /s %~dp0..\..\node_modules
rmdir /Q /s %~dp0..\..\build
del /Q /s %~dp0..\..\*.gzip
