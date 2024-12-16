const { createProject, createBoard, createColumn } = require("./createFunctions");
const {needCreateProject, needCreateBoards, needCreateColumns} = require("./chathandlers")
const keywordCreateProject = "создать проект"
const keywordCreateBoard = "создать доску"
const keywordCreateColumn = "создать колонку"

const aiHandler = async (text, userID) => {
 try {
  const gigaResponse = await needCreateProject(text);
  if (gigaResponse.toLowerCase().startsWith(keywordCreateProject.toLowerCase())) {
    const projectName = projectCreate.slice(keywordCreateProject.length).trim()
    const projectId = await createProject(projectName, userID);
    return projectId
  } else {
    console.log("Фраза не содержит команды тригер.");}

  const boardsResponse = await needCreateBoards(text);
  const boardsData = boardsResponse.split(',').map(board => board.trim());
  for (const board of boardsData) {
    const boardName = board.slice(keywordCreateBoard.length).trim();
    const boardId = await createBoard(boardName, projectId);
    const columnsResponse = await needCreateColumns(boardName, text);
    const columnsData = columnsResponse.split(',').map(column => column.trim());
    for (const columnData of columnsData) {
      const columnName = columnData.slice(keywordCreateColumn.length).trim();
      // Создаем колонку, передавая boardId
      await createColumn(columnName, boardId);
    }
  }
 }
 catch (error) {
  console.error('Ошибка при выполнении pipeline:', error);
}

}

module.exports = { aiHandler };