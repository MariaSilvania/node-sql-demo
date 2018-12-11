Aplicação de exemplo Node.Js com base de dados Sql Server

Montando o ambiente: 

1 - Clonar o repo
git clone https://github.com/edsondiasalves/node-sql-demo.git

2 - Instalar dependências
npm install

3 - Executar o sql server via docker
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Avanade@2018" -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2017-latest

4 - Criar a base de dados
Conecte no sql server usando o SSMS e execute o arquivo create-database.sql

5 - Executar a aplicação
npm start
