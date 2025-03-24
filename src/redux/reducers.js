// chat-app/src/redux/reducers.js
import { ADD_MESSAGE, TOGGLE_DARK_MODE } from './actions';

const initialState = {
    messages: [],
    isDarkMode: false,
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
        default:
            return state;
    }
}

export default rootReducer;