const express = require("express");
const server = express();
server.use(express.json());

server.listen(3001);

let requests = 0;

//MiddleWare
function checarProjetos(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
}

/**
 * Middleware que dá log no número de requisições
 */
function logRequests(req, res, next) {
  requests++;

  console.log(`Número de requisições: ${requests}`);

  return next();
}

const projects = [];
server.use(logRequests);
//GET

server.get("/projects", (req, res) => {
  return res.json(projects);
});

//POST

server.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});
server.post("/projects/:id/tasks", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

//PUT

server.put("/projects/:id", checarProjetos, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

// DELETE

server.delete("/projects/:id", checarProjetos, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
});
