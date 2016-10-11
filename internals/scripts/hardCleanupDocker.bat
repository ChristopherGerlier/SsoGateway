docker stop sso-gateway-dev
docker rm sso-gateway-dev
docker rmi sso-gateway
rmdir /Q /s %~dp0..\..\node_modules
rmdir /Q /s %~dp0..\..\build
del /Q /s %~dp0..\..\*.gzip
