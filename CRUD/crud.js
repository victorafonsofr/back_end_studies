const http = require("http");
const fs = require('fs/promises'); //file system para gerar o log

async function addLog(item) {
    try {
        // O texto que você quer adicionar (o "\n" no começo serve para pular uma linha)
        const newLine= '\n'+item;
        // fs.appendFile cria o arquivo se ele não existir, 
        // ou adiciona o texto no final caso ele já exista.
        await fs.appendFile('log.txt', newLine);
        
    } catch (error) {
        console.error('Couldn´t log', error);
    }
}

const log = []

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

    //headers
    let statusCode = 200;
    let contentType = "application/json"
    //response body
    let responseBody = {message: "Route not found"}

    // GET api/produtos retorna a lista de produtos e GET api/carros mostra a lista de carros
    if(method === "GET"){
        
        if(url === "/api/produtos"){
            responseBody ={produtos: database.produtos}; //return para parar o codigo
        }
        else if(url === "/api/carros"){
            responseBody ={carrosmalignos : database.carros};
        }
        // ROTA DINAMICA PARA VER OS CARROS INDIVIDUALMENTE ATRAVES DO ID
        // GET /api/carros/:id
        else if(url.startsWith("/api/carros/")){

            const id = Number(url.split("/")[3]); //o id será sempre a ultima posição da url, já se sabe o tamanho
            console.log("got dynamic url! url id: "+ id);
            const carro = database.carros.find( c => c.id === id);

            if(carro){
                responseBody = {carro};
            }else{
                statusCode = 404;
                responseBody = {message : `car id ${id} not found`};
            }
        }
    }

    if(responseBody?.message === "Route not found") statusCode = 404; // o operador "?" verifica se responseBody.message existe, caso não exista, retorna undefined

        //definindo o tipo de resposta que será enviado
    res.writeHead(statusCode, {"content-type": contentType});
    res.end(JSON.stringify(responseBody));

    //log de dados da requisicao
    log.push("Method: " + req.method +"\nTime(GMT-3): "+ new Date(Date.now()).toLocaleTimeString()+"\nAccessed URL: "+req.url+"\nStatus code: "+statusCode+"\n\n");
    console.log(req.method, new Date(Date.now()).toLocaleTimeString(), req.url, statusCode);

    log.forEach((l)=>{
    addLog(l)    
})
});

const PORT = 3000;

server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})




