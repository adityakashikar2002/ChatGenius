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

// import React from 'react';
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import ChatWindow from './components/ChatWindow';
// import ChatInput from './components/ChatInput';
// import DarkModeToggle from './components/DarkModeToggle';
// import { ToastContainer } from 'react-toastify';
// import './App.css';

// function App() {
//     return (
//         <Provider store={store}>
//             <div className="App">
//                 <DarkModeToggle />
//                 <ChatWindow />
//                 <ChatInput />
//                 <ToastContainer />
//             </div>
//         </Provider>
//     );
// }

// export default App;

// import React, { useState, useEffect } from 'react';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import store from './redux/store';
// import ChatWindow from './components/ChatWindow';
// import ChatInput from './components/ChatInput';
// import DarkModeToggle from './components/DarkModeToggle';
// import { ToastContainer } from 'react-toastify';
// import './App.css';
// import { addChat, setChats } from './redux/actions';

// function App() {
//     const [showSidebar, setShowSidebar] = useState(true);
//     const chats = useSelector((state) => state.chats);
//     const dispatch = useDispatch();
//     const [activeChatId, setActiveChatId] = useState(null);

//     useEffect(() => {
//         // Fetch chats from local storage or API on app load
//         const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
//         dispatch(setChats(storedChats));
//         if (storedChats.length > 0) {
//             setActiveChatId(storedChats[0].id);
//         }
//     }, [dispatch]);

//     useEffect(() => {
//         // Save chats to local storage whenever chats change
//         localStorage.setItem('chats', JSON.stringify(chats));
//     }, [chats]);

//     const handleNewChat = () => {
//         const newChatId = Date.now();
//         const newChat = { id: newChatId, title: `New Chat ${newChatId}` };
//         dispatch(addChat(newChat));
//         setActiveChatId(newChatId);
//     };

//     const handleChatClick = (id) => {
//         setActiveChatId(id);
//     };

//     return (
//         <Provider store={store}>
//             <div className="App">
//                 <div className={`sidebar ${showSidebar ? 'show' : ''}`}>
//                     <div className="sidebar-header">
//                         <button className="sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
//                             ☰
//                         </button>
//                         <button className="new-chat-button" onClick={handleNewChat}>
//                             + New chat
//                         </button>
//                     </div>
//                     <div className="sidebar-content">
//                         <h2>Recent</h2>
//                         <ul>
//                             {chats.map(chat => (
//                                 <li key={chat.id}
//                                     className={activeChatId === chat.id ? 'active' : ''}
//                                     onClick={() => handleChatClick(chat.id)}>
//                                     {chat.title}
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="chat-container">
//                     <DarkModeToggle />
//                     <ChatWindow activeChatId={activeChatId} />
//                     <ChatInput activeChatId={activeChatId} />
//                     <ToastContainer />
//                 </div>
//             </div>
//         </Provider>
//     );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import DarkModeToggle from './components/DarkModeToggle';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { addChat, setChats } from './redux/actions';

function App() {
    const [showSidebar, setShowSidebar] = useState(true);
    const chats = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const [activeChatId, setActiveChatId] = useState(null);

    useEffect(() => {
        const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
        dispatch(setChats(storedChats));
        if (storedChats.length > 0) {
            setActiveChatId(storedChats[0].id);
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(chats));
    }, [chats]);

    const handleNewChat = () => {
        const newChatId = Date.now();
        const newChat = { id: newChatId, title: `New Chat ${newChatId}` };
        dispatch(addChat(newChat));
        setActiveChatId(newChatId);
    };

    const handleChatClick = (id) => {
        setActiveChatId(id);
    };

    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <Provider store={store}>
            <div className="App">
                <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
                    <div className="sidebar-header">
                        <button className="sidebar-toggle" onClick={handleToggleSidebar}>
                            ☰
                        </button>
                        {/* <button className="new-chat-button" onClick={handleNewChat}>
                            {showSidebar ? `{<img src="/plus.png" alt="+" width={'25px'}/>}New Chat`: <img src="/plus.png" alt="+" width={'25px'}/>}
                        </button> */}
                        <button className="new-chat-button" onClick={handleNewChat}>
                            <img src="/plus.png" alt="+" width="25px" style={{ marginRight: '8px'}} />
                            {showSidebar ? "New Chat" : null}
                        </button>

                    </div>
                    {showSidebar && (
                        <div className="sidebar-content">
                            <h2>Recent</h2>
                            <ul>
                                {chats.map(chat => (
                                    <li key={chat.id}
                                        className={activeChatId === chat.id ? 'active' : ''}
                                        onClick={() => handleChatClick(chat.id)}>
                                        {chat.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="chat-container">
                    <DarkModeToggle />
                    <ChatWindow activeChatId={activeChatId} />
                    <ChatInput activeChatId={activeChatId} />
                    <ToastContainer />
                </div>
            </div>
        </Provider>
    );
}

export default App;