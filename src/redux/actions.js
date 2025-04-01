// // redux/actions.js
// export const ADD_MESSAGE = 'ADD_MESSAGE';
// export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
// export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
// export const ADD_CHAT = 'ADD_CHAT';
// export const UPDATE_CHAT = 'UPDATE_CHAT';
// export const SET_CHATS = 'SET_CHATS';
// export const REMOVE_CHAT = 'REMOVE_CHAT';
// export const SET_MESSAGES = 'SET_MESSAGES';

// export const addMessage = (message) => ({
//     type: ADD_MESSAGE,
//     payload: message,
// });

// export const toggleDarkMode = () => ({
//     type: TOGGLE_DARK_MODE,
// });

// export const updateMessages = (messages) => ({
//     type: UPDATE_MESSAGES,
//     payload: messages,
// });

// export const addChat = (chat) => ({
//     type: ADD_CHAT,
//     payload: chat,
// });

// export const updateChat = (chat) => ({
//     type: UPDATE_CHAT,
//     payload: chat,
// });

// export const setChats = (chats) => ({
//     type: SET_CHATS,
//     payload: chats,
// });

// export const removeChat = (chatId) => ({
//     type: REMOVE_CHAT,
//     payload: chatId,
// });

// export const setMessages = (messages) => ({
//     type: SET_MESSAGES,
//     payload: messages,
// });

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export const ADD_CHAT = 'ADD_CHAT';
export const UPDATE_CHAT = 'UPDATE_CHAT';
export const SET_CHATS = 'SET_CHATS';
export const REMOVE_CHAT = 'REMOVE_CHAT';
export const SET_MESSAGES = 'SET_MESSAGES';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'; // Add this line
export const INCREMENT_IMAGE_COUNT = 'INCREMENT_IMAGE_COUNT'; // Add this line


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

export const removeChat = (chatId) => ({
    type: REMOVE_CHAT,
    payload: chatId,
});

export const setMessages = (messages) => ({
    type: SET_MESSAGES,
    payload: messages,
});

export const updateMessage = (message) => ({ // Add this function
    type: UPDATE_MESSAGE,
    payload: message,
});

export const incrementImageCount = (chatId) => ({ // Add this function
    type: INCREMENT_IMAGE_COUNT,
    payload: chatId,
});