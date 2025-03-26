// import { ADD_MESSAGE, TOGGLE_DARK_MODE, UPDATE_MESSAGES } from './actions';

// const initialState = {
//     messages: [],
//     isDarkMode: false,
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
//                 messages: action.payload,
//             };
//         default:
//             return state;
//     }
// }

// export default rootReducer;
import { ADD_MESSAGE, TOGGLE_DARK_MODE, UPDATE_MESSAGES, ADD_CHAT, UPDATE_CHAT, SET_CHATS } from './actions';

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
            };
        case TOGGLE_DARK_MODE:
            return {
                ...state,
                isDarkMode: !state.isDarkMode,
            };
        case UPDATE_MESSAGES:
            return {
                ...state,
                messages: action.payload,
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
        default:
            return state;
    }
}

export default rootReducer;