# Nomad commerce application

Este repositorio contiene el servicio de api para el comercio nomad realizado con node.js, express, Typescript y además el frontend necesario para ello en nextjs, se utilizó el lenguaje de TypeScript y para un ejecución más simple se utilizó Docker

## Como ejecutar

Estando en el terminal ubicado en la carpeta raiz nomad-commerce-main que contiene las carpetas client, server, Dockerfile, debe ejecutar los siguientes comandos

1.

```
docker build -t nomad .
```

2.

```
docker run -ti --rm -p 4000:4000 nomad
```

Con eso se va a instalar y ejecutará todo lo necesario, tras eso bastará con abrir en su navegador:

http://localhost:4000/

\*Cabe destacar que una vez ejecutado el paso uno, una vez se quiera volver a ejecutar el programa solo es necesario utilizar el comando del paso 2
