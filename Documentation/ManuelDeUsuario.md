# Manual de Usuario

## Indice 馃摎
- [Utilizaci贸n](#utilizacion)

<div id="utilizacion">

## Utilizaci贸n
### Prerequisitos
- Docker Engine / Desktop
- Docker compose

Para utilizar la aplicaci贸n se debe utilizar el archivo [docker-compose.yml](./../docker-compose.yml), por medio del comando:
```
docker-compose up -d
```
Este comando proceder谩 ejecutar la aplicaci贸n y podr谩 ser accedida desde el `http://localholst:80` .

## Vista General
A continuaci贸n una vista general de la aplicaci贸n.
![Imagen general de la aplicacion](./img/main-view.png)

Se puede observar dos principales secciones.
La primer secci贸n tiene las operaciones posibles en color rojo.Las posibles operaciones son suma, resta, multiplicaci贸n y divisi贸n. 

### Calculadora

Para realizar una operaci贸n se deben seguir los siguientes pasos:
1. Ingresar el primer n煤mero con los botones.
2. Seleccionar la operaci贸n a realizar. 
3. Ingresar el segundo n煤mero con los botones. 
4. Tocar el bot贸n `=` .

El resultado aparecer谩 en la pantalla a continuaci贸n. Tambi茅n se puede tocar el bot贸n `DEL` para borrar la pantalla.

### Registros
En la secci贸n de registros aparecer谩n las operaciones que se realizaron anteriormente. 
![Imagen de los registros](./img/logs.png)

Con el bot贸n `Hide` se pueden ocultar todos los registros y con el bot贸n `Show` es posible mostrarlos nuevamente. 

![Imagen del bot贸n show](./img/show-button.png)