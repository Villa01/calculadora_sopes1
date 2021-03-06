# Manual Tecnico
## Indice 馃摎
- [Arquitectura](#arquitectura)
- [Base de datos](#modelo)
- [Frontend](#vista)
- [Backend](#controlador)
  
Calculator es una aplicaci贸n web realizada por medio de ReactJS, para el frontend, Go, para el Backend y MongoDB como base de datos. Tambien se utilz贸 Docker para generar im谩genes individuales de cada parte de la aplicaci贸n y Docker Compose para la orquestaci贸n de los mismos. 

<div id='arquitectura'>

## Arquitectura
<img src="./img/arq.png">

La arquitectura consiste en un MVC, donde el frontend, el backend y la base de datos corren en contenedores individuales. 


<div id='modelo'>

### Modelo
El modelo se implement贸 por medio de una base de datos en MongoDB versi贸n 5.0.6. La imagen de MongoDB que se utiliz贸 es mongo:5.0.6-focal. Adem谩s, se utiliz贸 un vol煤men para que los datos persistan. El vol煤men lo genera en la carpeta [Database](./../database).

`Puerto: 27017`


<div id='vista'>
  
### Vista 

La vista se realiz贸 por medio de la libreria ReactJS en la version 17.0.2. Para la versi贸n de producci贸n se utiliz贸 Nginx como servidor de archivos est谩ticos. Para los estilos se utilz贸 [bootstrap](https://getbootstrap.com/) en la versi贸n 5.1.3. 

#### Generar Nueva Version

Para hacer cambios se necesita utilizar el comando: 
```
npm run build
```
Para generar en la carpeta [build](./../frontend/calculator/build/) una versi贸n est谩tica de la aplicaci贸n. 
Posteriormente, se puede generar la im谩gen con el siguiente comando: 
```
docker build -t villa01/frontend_p1_201900907 .
```

En el archivo [Dockerfile](./../frontend/Dockerfile) se encuentra la la configuraci贸n para realizar una im谩gen de Nginx, copiar el [archivo de configuraci贸n](./../frontend/nginx.conf) del servidor y copiar la carpeta [build](./../frontend/calculator/build/) dentro del contenedor. 

#### Organizacion del Frontend

```
frontend:.
鈹溾攢鈹?鈹?build
鈹?   鈹斺攢鈹?鈹?static
鈹?       鈹溾攢鈹?鈹?css
鈹?       鈹斺攢鈹?鈹?js
鈹溾攢鈹?鈹?public
鈹斺攢鈹?鈹?src
    鈹溾攢鈹?鈹?Components
    鈹?   鈹溾攢鈹?鈹?Calculator.js
    鈹?   鈹溾攢鈹?鈹?Calculator.css
    鈹?   鈹溾攢鈹?鈹?CalculatorButton.js
    鈹?   鈹溾攢鈹?鈹?CalculatorNumericalPad.js
    鈹?   鈹溾攢鈹?鈹?CalculatorTable.js
    鈹?   鈹斺攢鈹?鈹?CalculatorReports.js
    鈹溾攢鈹?鈹?App.js
    鈹溾攢鈹?鈹?App.css
    鈹溾攢鈹?鈹?index.css
    鈹溾攢鈹?鈹?index.js
    鈹斺攢鈹?鈹?setupTests.js
```
En la carpeta [Components](./../frontend/src/Components/) se encuentran los componentes necesarios para la organizaci贸n de la calculadora. 


<div id='controlador'>

### Controlador
El backend se implement贸 en Go con la imagen de docker 1.16-alpine. Para la realizaci贸n de una API funcional se utiliz贸 [Gorilla Mux](https://github.com/gorilla/mux).

#### Generar Nueva Version

Se puede generar una nueva imagen del backend con el siguiente comando: 
```
docker build -t villa01/backend_p1_201900907 .
```

En el archivo [Dockerfile](./../backend/dockerfile) se encuentra la configuraci贸n para realizar una im谩gen Go, copiar y descarga de los archivos de dependencias y la compilaci贸n y ejecuci贸n del programa. La api est谩 expuesta en el `Puerto:8080`.

#### Endpoints
| Ruta | Metodo | Descripci贸n |
|------|--------|-------------|
| / | GET | Ruta de prueba para determinar si la API est谩 en funcionmaniento | 
| /doOperation | POST | Se espera una peticion con la informaci贸n de una operaci贸n. |
| getOperations | GET | Se obtienen todas operaciones guardadas en la base de datos. 
