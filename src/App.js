// // chat-app/src/App.js
// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import ChatWindow from './components/ChatWindow';
// import ChatInput from './components/ChatInput';
// import DarkModeToggle from './components/DarkModeToggle';
// import VoiceInput from './components/VoiceInput'; // Import VoiceInput
// import './App.css';

// function App() {
//     return (
//         <Provider store={store}>
//             <div className="App">
//                 <DarkModeToggle />
//                 <ChatWindow />
//                 <ChatInput />
//                 <VoiceInput /> {/* Include VoiceInput component */}
//             </div>
//         </Provider>
//     );
// }

// export default App;

import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import DarkModeToggle from './components/DarkModeToggle';
import { ToastContainer } from 'react-toastify';
import './App.css';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <DarkModeToggle />
                <ChatWindow />
                <ChatInput />
                <ToastContainer />
            </div>
        </Provider>
    );
}

export default App;