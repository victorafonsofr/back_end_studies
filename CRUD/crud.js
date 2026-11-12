const http = require("http");


const database = {
    produtos: [
        {   id:1, 
            name:"Samsung S30",
            preco: 2000
        },
        {   id:2, 
            name:"Playstation 4",
            preco: 4020
        },
        {   id:3, 
            name:"TUF gaming F16",
            preco: 6300
        }
        ],
        carros: [
        {   id: 1, 
            name: "Honda Civic",
            preco: 120000
        },
        {   id: 2, 
            name: "Toyota Corolla",
            preco: 135000
        },
        {   id: 3, 
            name: "Volkswagen Golf GTI",
            preco: 180000
        }
    ]
};
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
        if(url === "/api/produtos")
            return res.end(JSON.stringify({produtos: database.produtos})); //return para parar o codigo
        
        else if(url === "/api/carros")
            return res.end(JSON.stringify({carrosmalignos : database.carros}));
    }
    res.end(`{"msg":"route not found"}`);

    //log de dados da requisicao
    console.log(req.method, req.url)
   
});

const PORT = 3000;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})



