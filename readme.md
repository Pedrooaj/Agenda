
# Agenda Web
Este projeto se trata de uma Agenda web aberta para todos que estão dispostos a se registrar adicionarem contatos.
Alem disto eu fiz o projeto com intuito de exercer minhas habilidades em back-end com ExpressJS, EmbedJS,NodeJS e Webpack.



## Conceitos e Tecnologias utilizadas

Neste projeto foram utilizadas as seguintes Tecnologias:

- **Orientação a Objetos** utilizamos o conceito de programação orientada a objetos para deixarmos o código mais organizado e de mais facil manutenção.

- **MVC** e um padrão de sofware da decada de 70, com sua facil escalabilidade com Models, View e Controllers. Este modelo se torna muito robusto junto a programação orientada a objetos

- **ExpressJS** é uma biblioteca utilizada para criação de Api's REST em nodeJS. Com um sistema de rotas bem simples alem de ser relativamente facil de fazer integrações.
- **Express-Session** é uma biblioteca utilizada para criar sessoes no lado do servidor deixando sua apliação muito segura porem ele tem alto consumo de memoria em grandes aplicações caso não seja utilizado biblioteca de terceiros que armazenam suas sessoes no Banco de dados.
- **Mongoose** é uma biblioteca para facilitar a conexão e gerenciamento do banco de dados MongoDB.
- **Connect-mongo** é uma biblioteca utilizada para guardar sessões do express-session no banco de dados MongoDB.
- **EmbedJS** támbem conhecido como EJS, ele e uma view engine muito utilizada por ser identica a HTML, alem de ser usada para desenvolvimento dinâmico em ExpressJS
- **Csurf** é uma biblioteca muito utilizada trazendo a segurança CSRF para a aplicação e impedindo que POST sejam feitos sem validação dele.
- **Connect-flash** foi utilizada no projeto para fornecer mensagens temporarias e versateis e rapidas para o cliente que são consumidas apenas uma unica vez.
- **Nodemon** foi utilizada como dependencia de desenvolvimento para criação da API.
- **Webpack** foi utilizado para realizar a compactação/compilação do front-end.
- **Bcryptjs** é uma biblioteca muito utlizada por sua seguraça onde ela foi responsavel por fazer o hash da senha assim evitando visibilidade de dados sensiveis.
- **Validator** foi utilizado para facilitar na validação Email e afins ele tem diversos tipos de validação.
- **Dotenv** é utilizado para salvar variaveis de ambientes e proteger as infomações de conexão do banco de dados.


## Rotas
- **/** - rota index ou também conhecida como home e a rota principal do projeto onde ela ira exibir a lista de contatos existente na aplicação.
- **/login** - a rota onde efetuamos login e registro de usuários para efetuarmos a adição de contatos. Nela temos POST e GET para registro login e logout.
- **/contato** - nesta rota nois temos diversas funcionalidades como adição de contatos e exclusão de tais.


## Middlewares
- **checkCsrfError** - Middleware para tratar erros csrf de formularios não autorizados pela aplicação.
- **middleWareGlobal** - E o principal middleware da aplicação pois nele utilizamos o connect flash para enviarmos mensagens rápidas e de forma que todas rotas tenham acesso.
- **generateCsrfToken** - Middleware responsavel por gerar tokens csrf para aplicação.

- **loginRequired** - Responsavel por gerir fluxo de login na aplicação e bloquear acessos não autorizados.


## Models
- **LoginModel** e o model referente ao usuario do sistema, que gerencia toda agenda ou seja ele tem funções como login,logout e registro.
- **ContatoModel** e o model referente ao contato do sistema, nele há informações como Nome,Email e telefone.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`API_KEY`



## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/Pedrooaj/Agenda.git
```

Entre no diretório do projeto

```bash
  cd Agenda
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Stack utilizada

**Front-end:** EJS,Webpack e Bootstrap. 

**Back-end:** NodeJS, Express e MongoDB.


## Autores

- [@pedrooaj](https://www.github.com/pedrooaj)
