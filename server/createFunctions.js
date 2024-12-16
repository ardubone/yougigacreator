const yougile = require("yougile");

async function createProject(title, userID) {
  const data = {
    title: `${title}`,
    users: {
      [userID]: "admin",
    },
  };
  const response = await yougile.Api.post(`/projects`, data);
  return response.id;
}

async function createBoard(title, projectId) {
  const data = {
    title: `${title}`,
    projectId: `${projectId}`,
  };
  const response = await yougile.Api.post(`/boards`, data);
  return response.id;
}

function getRandomColor() {
  return Math.floor(Math.random() * 16) + 1;
}

async function createColumn(title, boardId) {
  const data = {
    title: `${title}`,
    "color": getRandomColor(), //от 1 до 16
    boardId: `${boardId}`,
  };
  const response = await yougile.Api.post(`/boards`, data);
  return response.id;
}

module.exports = { createProject, createBoard, createColumn };
