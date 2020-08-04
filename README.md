[![Build Status](https://travis-ci.com/Choutuve-Inc/7552-Chotuve-Auth.svg?branch=master)](https://travis-ci.com/Choutuve-Inc/7552-Chotuve-Auth)
# Chotuve
Trabajo practico Taller 2

Se puede ejecutar el servidor con node o con docker

## Node
Para ejecutar el proyecto con node, con npm instalado
se debe tener mongoDB corriendo y ejecutar 
```
npm start
```

## Docker
Para levantar el servidor en docker se consta de un docker compose que setea los puertos 
adicionalemnte levanta una instancia interna de mongoDB
```
docker-compose up --build
```

## Tests
Test con istambul
```
npm test
```

## Api y arquitectura:
https://docs.google.com/document/d/1d6lu6t_hO2r7-are_qe6hpThudjRH5Rm48Ulp91yVhM/edit?usp=sharing
