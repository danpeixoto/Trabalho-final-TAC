# OBSERVAÇÔES

Foi omitios alguns arquivos essenciais para o funcionamento das apis por motivo de segurança. Então vou mostrar quais arquivos você deve criar para que a aplicação funcione corretamente.

## Arquivos
Foram omitdos as pastas *node_modules* mas isso é gerado automaticamente com o ***npm install*** e ***npm install --save-dev***.

### Pasta api-likes
Nela você precisa criar um arquivo chamado default.json na pasta config. Dentro desse arquivo está a URI de conexão com o banco MongoDB e o salt do jwt. O arquivo deve parecer com o json abaixo:

    {
      "jwtSecret":"Eu sou um segredo",
      "mongoURI":"cole a URI AQUI"
    }

### Pasta backend
Nessa pasta é preciso criar uma pasta chamada config e um arquivo dentro dela chamado default.json (igual na pasta api-likes). O arquivo deve parecer com o json abaixo:

    {
      "jwtSecret":"Eu sou um segredo",
      "adminSecret":"Eu sou outro segredo"
    }