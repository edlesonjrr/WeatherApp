const express = require('express')
const app = express()
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo');
const routes = require('./routes')
const cors = require('cors')
const csrf = require('csurf')

mongoose.connect('mongodb+srv://lucca:1234@cluster1.uwfsi1i.mongodb.net/', {
    useNewUrlParser: true, useUnifiedTopology: true
}). then(()=> {
    console.log ('Conectei a base de dados');
    app.emit('pronto');
})

.catch(e => { console.log('Aqui deu merda')});
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//  Faz o caminho da navegação;
app.use(routes)
app.use(csrf)
app.use(cors({
    origin:'*'
}))
app.on('pronto', () => {
    //  Inicia o servidor local
    app.listen(8000, () => {
        console.log('Acessar http://localhost:8000/');
        console.log('Servidor executando na porta 8000');
    });
});

console.log('teste')