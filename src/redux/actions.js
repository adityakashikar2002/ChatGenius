// // WORKS 100
// export const ADD_MESSAGE = 'ADD_MESSAGE';
// export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';

// export const addMessage = (message) => ({
//     type: ADD_MESSAGE,
//     payload: message,
// });

// export const toggleDarkMode = () => ({
//     type: TOGGLE_DARK_MODE,
// });
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'; // Corrected: Export this

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