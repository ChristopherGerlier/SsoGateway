docker stop readme-dev
docker rm readme-dev
docker rmi readme
rmdir /Q /s %~dp0..\..\node_modules
rmdir /Q /s %~dp0..\..\build
del /Q /s %~dp0..\..\*.gzip
