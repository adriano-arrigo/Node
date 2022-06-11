//Este pequeno projeto em Node cria um servido, registra, altera, seleciona e deleta arquivos .txt.
//Em especial, foi estudado o pacote query-string e o módulo file-system.
//As informações e snippets de código foram encontradas no site do W3C Schools.

//inclusao de bibliotecas (deve ser incluida com const, pq nao ira mudar)
const http = require('http');
const queryString = require('query-string'); //biblioteca para usar o parse
const url = require('url'); //inclusao do pacote URL. o parametro (no caso, 'url') é pacote padrao do NODE 
const fs = require('fs');

//definicao de endereço
const hostname = '127.0.0.1'; //localhost
const port = 3000;

//implementacao 
const server = http.createServer((req, res) => {
  var resposta;
  const urlparse = url.parse(req.url, true);
  const params = queryString.parse(urlparse.search);
  console.log(params);

   //criar, salvar e atualizar usuario no arquivo

  if (urlparse.pathname == '/criar-atualizar-usuario') {
    const params = queryString.parse(urlparse.search);

        fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
        if (err) throw err;
        console.log('Saved!');

        resposta = "usuario criado/atualizado com sucesso";
        res.statusCode = 200; //deu certo
        res.setHeader('Content-Type', 'text/plain'); // decodificacao da resposta em json
        res.end(resposta); //envia o texto pra tela
});

  resposta = 'usuario criado com sucesso';
  }

//selecionar usuario
else if(urlparse.pathname == '/selecionar-usuario') {
  fs.readFile('users/' + params.id + '.txt', function(err, data) {
   resposta = data; // preenche a resposta com as informacoes recebidas

   res.statusCode = 200; //deu certo
   res.setHeader('Content-Type', 'text/plain'); // codificacao
   res.end(resposta); //envia o texto pra tela
  });
}
//remover usuario
else if(urlparse.pathname == '/remover-usuario') {
  fs.unlink('users/' + params.id + '.txt', function (err) {
      console.log('File deleted!');
      resposta = err ? "usuario nao encontrado" :  "usuario removido";   
      res.statusCode = 200; 
      res.setHeader('Content-Type', 'text/plain'); // codificacao
      res.end(resposta); //envia o texto pra tela
  }); 
  
}
});

//execucao
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 

//http://localhost:3000/criar-atualizar-usuario?nome=adriano&idade=80&id=001
//http://localhost:3000/selecionar-usuario?id=002
//http://localhost:3000/remover-usuario?id=002
