// chat-app/src/redux/actions.js
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message,
});

export const toggleDarkMode = () => ({
    type: TOGGLE_DARK_MODE,
});