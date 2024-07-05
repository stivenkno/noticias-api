/*

Porque usar express? Vs HTTP module

Express: Se utiliza para desarrollar aplicaciones web y Apis

Caracteristicas:
-Manejo de peticiones HTTP
-Integracion con motores de renderizacion
-Establecer ajustes de peticiones
-Añadir procesamiento de peticiones



video node

req.params: obtiene los parametros de la url
req.headers: obtiene las cabeceras
req.get(): obtiene el valor de una cabecera

res.status: establece el estado de la respuesta

MIDDLEWARE: Una funcion que se ejecuta para multiples endpoints



*/



import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import routes from './routers/main_router.js';
dotenv.config();

const PORT = 3000;
const expressApp = express();

expressApp.use(express.json()); // Middleware para parsear las JSON en las solicitudes

expressApp.get('/cuenta/:id', (req, res) => {
    console.log(req.query);
    res.send("hola mundo");
});


expressApp.use('/api', routes);

expressApp.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


//http://localhost:3000