const http = require("http");
const database = {
    produtos: ["Samsung S30", "Playstation 4", "Fortnite token"]
}
// métodos http
    // GET - buscar/ler/pegar
    // POST - criar
    // PUT - atualizar
    // PATCH - atualizar porém atualiza de forma parcial, sem precisar preencher todos os campos
    // DELETE  - apagar recurso
    // rotas -> urls que identificam recursos da aplicação "/produtos"
    

const server = http.createServer((req, res )=>{
    
    const {method, url} = req;

    //definindo o tipo de resposta que será enviado
    res.writeHead(200, {"content-type":"application/json"});


    if(method === "GET"){
        if(url === "/api/produtos"){
            return res.end(`{ "produtos" : ["produto1", "produto2"] } `); //return para parar o codigo
        }
    }
    res.end(`{"msg":"route not found"}`);

    //log de dados da requisicao
    console.log(req.method, req.url)
   
});

const PORT = 3000;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})



