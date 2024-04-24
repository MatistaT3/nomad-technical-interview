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

## Supuestos o comportamientos adicionales

Dentro de la pagina principal donde se genera el carrito aleatorio para darle un mejor feedback al usuario se despliega el carrito.
Tambien se agregaron PopOvers para dar un mejor feedback al presionar ciertos botones.
Un supuesto en base a lo anterior, ya que a la hora de presionar el boton de calcular despacho no se specifica como se debe mostrar el mensaje, se utilizó ese popover sobre el mismo botón para presentarlo.
Otro supuesto o comportamiento es que el archivo se ejecuta mediante Docker, para de esta manera sea más facil y no tener que realizar tantos comandos, por lo que docker es requerido, si en algún caso no se tuviera y fuera imposible de usar, habría que ir en un terminal al directorio server ejecutar npm i y despues npm run dev, y tambien en el directorio client hacer lo mismo, npm i y despues npm run dev, sin embargo en ese caso no se ejecutarán en el mismo puerto, y el front se desplegaría en el puerto 3000 o 3001, por lo que habría que abrir ese http://localhost:3000
