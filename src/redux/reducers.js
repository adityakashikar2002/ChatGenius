// // redux/reducers.js
// import { ADD_MESSAGE, TOGGLE_DARK_MODE, UPDATE_MESSAGES, ADD_CHAT, UPDATE_CHAT, SET_CHATS, REMOVE_CHAT, SET_MESSAGES } from './actions';

// const initialState = {
//     messages: [],
//     isDarkMode: false,
//     chats: [],
// };

// function rootReducer(state = initialState, action) {
//     switch (action.type) {
//         case ADD_MESSAGE:
//             return {
//                 ...state,
//                 messages: [...state.messages, { ...action.payload, isNewMessage: action.payload.sender === 'bot' }],
//                 chats: state.chats.map((chat) =>
//                     chat.id === action.payload.chatId ? { ...chat, history: [...chat.history, action.payload] } : chat
//                 ),
//             };
//         case TOGGLE_DARK_MODE:
//             return {
//                 ...state,
//                 isDarkMode: !state.isDarkMode,
//             };
//         case UPDATE_MESSAGES:
//             return {
//                 ...state,
//                 messages: state.messages.map(msg => {
//                     const updatedMsg = action.payload.find(m => m.id === msg.id);
//                     return updatedMsg ? { ...updatedMsg, isNewMessage: msg.isNewMessage ?? false } : msg;
//                 }),
//             };
//         case ADD_CHAT:
//             return {
//                 ...state,
//                 chats: [...state.chats, action.payload],
//             };
//         case UPDATE_CHAT:
//             return {
//                 ...state,
//                 chats: state.chats.map((chat) =>
//                     chat.id === action.payload.id ? action.payload : chat
//                 ),
//             };
//         case SET_CHATS:
//             return {
//                 ...state,
//                 chats: action.payload,
//             };
//         case REMOVE_CHAT:
//             return {
//                 ...state,
//                 chats: state.chats.filter((chat) => chat.id !== action.payload),
//             };
//         case SET_MESSAGES:
//             return {
//                 ...state,
//                 messages: action.payload.map(msg => ({ ...msg, isNewMessage: false })),
//             };
//         default:
//             return state;
//     }
// }

// export default rootReducer;

// import { ADD_MESSAGE, TOGGLE_DARK_MODE, UPDATE_MESSAGES, ADD_CHAT, UPDATE_CHAT, SET_CHATS, REMOVE_CHAT, SET_MESSAGES, UPDATE_MESSAGE } from './actions'; // Import UPDATE_MESSAGE

// const initialState = {
//     messages: [],
//     isDarkMode: false,
//     chats: [],
// };

// function rootReducer(state = initialState, action) {
    import { ADD_MESSAGE, TOGGLE_DARK_MODE, UPDATE_MESSAGES, ADD_CHAT, UPDATE_CHAT, SET_CHATS, REMOVE_CHAT, SET_MESSAGES, UPDATE_MESSAGE, INCREMENT_IMAGE_COUNT } from './actions';

    const initialState = {
        messages: [],
        isDarkMode: false,
        chats: [],
    };
    
    function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, { ...action.payload, isNewMessage: action.payload.sender === 'bot' }],
                chats: state.chats.map((chat) =>
                    chat.id === action.payload.chatId ? { ...chat, history: [...chat.history, action.payload] } : chat
                ),
            };
        case TOGGLE_DARK_MODE:
            return {
                ...state,
                isDarkMode: !state.isDarkMode,
            };
        case UPDATE_MESSAGES:
            return {
                ...state,
                messages: state.messages.map(msg => {
                    const updatedMsg = action.payload.find(m => m.id === msg.id);
                    return updatedMsg ? { ...updatedMsg, isNewMessage: msg.isNewMessage ?? false } : msg;
                }),
            };
        // 
        case ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, { ...action.payload, imageGenerationCount: 0 }], // Initialize count
            };
        case UPDATE_CHAT:
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat.id === action.payload.id ? action.payload : chat
                ),
            };
        case INCREMENT_IMAGE_COUNT:
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat.id === action.payload ? { ...chat, imageGenerationCount: chat.imageGenerationCount + 1 } : chat
                ),
            };
        case SET_CHATS:
            return {
                ...state,
                chats: action.payload,
            };
        case REMOVE_CHAT:
            return {
                ...state,
                chats: state.chats.filter((chat) => chat.id !== action.payload),
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.payload.map(msg => ({ ...msg, isNewMessage: false })),
            };
        case UPDATE_MESSAGE: // Add this case
            return {
                ...state,
                messages: state.messages.map(msg =>
                    msg.id === action.payload.replaceId ? { ...action.payload, id: action.payload.replaceId } : msg
                ),
                chats: state.chats.map((chat) => {
                    if (chat.id === action.payload.chatId) {
                        return {
                            ...chat,
                            history: chat.history.map((historyMsg) =>
                                historyMsg.id === action.payload.replaceId ? { ...action.payload, id: action.payload.replaceId } : historyMsg
                            ),
                        };
                    }
                    return chat;
                }),
            };
        default:
            return state;
    }
}

export default rootReducer;