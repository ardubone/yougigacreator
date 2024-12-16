const getUserFromChat = require('./chatfunc');
const yougile = require('yougile');
const {aiHandler} = require('./aihandlers')
const chatIdForCreateProject = 'chat_id'


const handler = async data => {
    const text = data?.text;
    const chatId = data?.chatId;
    const userId = await getUserFromChat(chatId, data?.id);
    if (chatId === chatIdForCreateProject) {
        await aiHandler(text, userId);
        // console.log('Получено сообщение в чате', chatId, 'с текстом', text, 'от пользователя', userId);
    }
}

// Подписка
yougile.Api.subscribe({ event: 'chat_message-created', handler });
