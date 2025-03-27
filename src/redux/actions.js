// WORKS 100
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const ADD_CHAT = 'ADD_CHAT';
export const UPDATE_CHAT = 'UPDATE_CHAT';
export const SET_CHATS = 'SET_CHATS';

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message,
});

export const toggleDarkMode = () => ({
    type: TOGGLE_DARK_MODE,
});

export const updateMessages = (messages) => ({
    type: UPDATE_MESSAGES,
    payload: messages,
});

export const addChat = (chat) => ({
    type: ADD_CHAT,
    payload: chat,
});

export const updateChat = (chat) => ({
    type: UPDATE_CHAT,
    payload: chat,
});

export const setChats = (chats) => ({
    type: SET_CHATS,
    payload: chats,
});