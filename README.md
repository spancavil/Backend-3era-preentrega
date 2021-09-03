# Backend Proyecto-Final (2da preentrega)

## Persistencias
Filesystem (Carrito y Producto)
Mongo (Local y Atlas)
mySQL (local)

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
1. No se incopora ninguna vista, todas las consultas se deben hacer a través de POSTMAN o ThunderClient (extensión de VSC).

2. En mySQL se hizo una relación uno a muchos, utilizando una foreign key, de modo tal que si se quiere guardar un producto en el carrito con un id que no esté presente en la tabla de productos, no se puede guardar.

3. Para seleccionar las persistencias se optó por generar un archivo llamado persistenceTypes en la carpeta cfg. Se debe cambiar los valores desde ahí, para seleccionar la persistencia adecuada (se comentó como debería escribirse).

4. Se siguió un modelo de factory para obtener la persistencia adecuada. A su vez cada persistencia hereda de una interface común, para que todas tengan los mismos métodos.
