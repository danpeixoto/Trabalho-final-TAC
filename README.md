# OBSERVAÇÕES

Foi omitios alguns arquivos essenciais para o funcionamento das apis por motivo de segurança. Então vou mostrar quais arquivos você deve criar para que a aplicação funcione corretamente.

## Arquivos

Foram omitidos as pastas _node_modules_, mas ela é gerada automaticamente com o **_npm install_** e **_npm install --save-dev_**.

Porém existe duas outras pastas que você será obrigado a criar na mão. Segue abaixo elas:

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
