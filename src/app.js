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
  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  repositories.push(repositorie);

  return response.json(repositorie);
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
  const repositorie = repositories.find(obj => obj.id == id);
  if(repositorie < 0){
    return response.status(400).json({error: 'Repositorie not found.'});
}
  repositorie.title = title;
  repositorie.url = url;
  repositorie.techs = techs;
  return response.json(repositorie);
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
  const repositorie = repositories.indexOf(obj => obj.id == id);
  if(repositorie < 0){
    return response.status(400).json({error: 'Repositorie not found.'});
}
  repositories.splice(repositorie, 1);
  return response.send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;
  const repositorie = repositories.find(obj => obj.id == id);
  if(repositorie < 0){
    return response.status(400).json({error: 'Repositorie not found.'});
}
  let like = ++repositorie.likes

  return response.json({repositorie: repositorie.title, likes: like});
});

module.exports = app;
