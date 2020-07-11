const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const {  title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
   //Exemplo de como Encontrar objeto dentro de um array
  //const list = [
  //  { id: 1, name: 'Suissa' },
  //  { id: 2, name: 'Jean' }
  //]
  //const result = list.find( obj => obj.name === 'Suissa' )
  //console.log( result ) // { id: 1, name: 'Suissa' }

  const { id } = request.params;
  const { title, url, techs} = request.body;
  const repositoryIndex = repositories.findIndex(obj => obj.id == id);
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'repository not found.'});
}
const repository = repositories[repositoryIndex];
  repository.title = title;
  repository.url = url;
  repository.techs = techs;
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  //COMO REMOVER DETERMINADOS ELEMENTOS DE UMA ARRAY NO JAVASCRIPT
  //var array = [2, 4, 5, 7, 8];
  //var index = array.indexOf(7);
  //if ( index > -1) {
  //  array.splice(index, 1);
  //}
  const repositoryIndex = repositories.findIndex(obj => obj.id == id);
  if(repositoryIndex < 0){
    return response.status(400).json({error: 'repository not found.'});
}
  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(obj => obj.id == id);

  if(repositoryIndex < 0){
      return response.status(400).json({error: 'Repository not found.'});
  }

  const {likes, ...repo} = repositories[repositoryIndex];

  const repository = {...repo, likes: likes + 1};

  repositories.splice(repositoryIndex, 1, repository);

  return response.json(repository);
});
module.exports = app;
