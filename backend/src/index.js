const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://claudio:pulim72489653@cluster0-tcmmo.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

app.use(cors());
app.use(express.json()); // Sempre na frente antes de usar as rotas exportadas pois se não não conseguimos verificar payload pelo metodo POST
app.use(routes);
app.listen(3333);

// Métodos HTTP - > get, post, put, delete
//Tipos de parametros:

//Query Params: request.query (Usados para filtros, ordenação, paginação, ...)
//Route Params: rquest.params (Indentificar um recurso na alteração ou remoção)
//Body: request.body(Usado para criação ou alteração de um registro)

//MongoDB: Banco não relacional

