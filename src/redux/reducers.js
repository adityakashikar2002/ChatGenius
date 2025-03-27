// // redux/reducers.js
// import { ADD_MESSAGE, TOGGLE_DARK_MODE, UPDATE_MESSAGES, ADD_CHAT, UPDATE_CHAT, SET_CHATS, REMOVE_CHAT, ADD_MESSAGE_TO_CHAT } from './actions';

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
//                 messages: [...state.messages, action.payload],
//             };
//         case TOGGLE_DARK_MODE:
//             return {
//                 ...state,
//                 isDarkMode: !state.isDarkMode,
//             };
//         case UPDATE_MESSAGES:
//             return {
//                 ...state,
//                 messages: state.messages.map(msg => action.payload.find(m => m.id === msg.id) || msg),
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
//         case ADD_MESSAGE_TO_CHAT:
//             return {
//                 ...state,
//                 chats: state.chats.map((chat) =>
//                     chat.id === action.payload.chatId
//                         ? { ...chat, history: [...chat.history, action.payload.message] }
//                         : chat
//                 ),
//             };
//         default:
//             return state;
//     }
// }

// export default rootReducer;

// reducers.js 
import { ADD_MESSAGE, TOGGLE_DARK_MODE, UPDATE_MESSAGES, ADD_CHAT, UPDATE_CHAT, SET_CHATS, REMOVE_CHAT, SET_MESSAGES } from './actions';

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
                messages: [...state.messages, action.payload],
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
                messages: state.messages.map(msg => action.payload.find(m => m.id === msg.id) || msg),
            };
        case ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, action.payload],
            };
        case UPDATE_CHAT:
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat.id === action.payload.id ? action.payload : chat
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
                messages: action.payload,
            };
        default:
            return state;
    }
}

export default rootReducer;