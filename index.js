const express = require("express"); //importa a biblioteca express
//express cria um servidor
const server = express();

//necessário uma rota para ser acessada
server.get('/usuario',(request, response)=>{
        console.log(request.query.usuario) //request chega no servidor
        return response.send("Olá "+request.query.usuario)//response éenviado pro usuario
}) //qual o endereço da rota?

//colocar o servidor no ar
server.listen(3000) //porta 3000 por padrao