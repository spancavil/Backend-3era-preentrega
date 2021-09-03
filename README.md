# Backend Proyecto-Final (3era preentrega)

## Persistencias
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

