# Backend Proyecto-Final (3era preentrega)

## Persistencia
Mongo Atlas

## Body para Postman
A continuación, se adjuntan los bodies a utilizar en los distintos endpoints.

### Productos
- POST /guardar
```Javascript 
{
    "admin":true,
    "nombre":"un lindo producto",
    "descripcion":"Una linda descripción",
    "codigo":"iasjdijx8374hasdb",
    "imagen":"/path/ficticio/2912u38",
    "precio":200,
    "stock":10
}
```

- PUT /actualizar/:id
```Javascript 
{
    "admin":true,
    "nombre":"un FEO producto",
    "descripcion":"Una FEA descripción",
    "codigo":"iasjdijx8374hasdb",
    "imagen":"/path/ficticio/2912u38",
    "precio":200,
    "stock": 2
}
```

### Carrito
No requiere bodies

## Notas importantes
- Se generaron las vistas correspondientes acorde a cada etapa del flow de la app.
````
Sign-up => Login => Vista de datos/menú del usuario => Carrito => Checkout
````

- A partir de la vista se solicitan siempre credenciales (debe estar loggeado el usuario para acceder).

- Se añadieron dos rutas más al carrito que son: ver carrito y checkout.

- En EJS se encontrará también lógica JavaScript. En dicha lógica para acceder a la información ya renderizada se hace a través del DOM.

- Se separaron todas las rutas en 3 routers distintos y quedó limpio el server.js

- Para ejecutar los test de rendimiento con artillery se llevó a cabo el procedimiento descripto en testRendimiento

