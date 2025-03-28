// // App.js
// import React, { useState, useEffect } from 'react';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import store from './redux/store';
// import ChatWindow from './components/ChatWindow';
// import ChatInput from './components/ChatInput';
// import DarkModeToggle from './components/DarkModeToggle';
// import { ToastContainer } from 'react-toastify';
// import './App.css';
// import { setChats, setMessages } from './redux/actions';
// import Sidebar from './components/Sidebar';

// function App() {
//     const [showSidebar, setShowSidebar] = useState(true);
//     const dispatch = useDispatch();
//     const [activeChatId, setActiveChatId] = useState(null);
//     const isDarkMode = useSelector((state) => state.isDarkMode); // Access isDarkMode from Redux

//     useEffect(() => {
//         const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
//         dispatch(setChats(storedChats));
//         if (storedChats.length > 0) {
//             setActiveChatId(storedChats[0].id);
//             const activeChatMessages = storedChats.find(chat => chat.id === storedChats[0].id)?.history || [];
//             dispatch(setMessages(activeChatMessages));
//         }
//     }, [dispatch]);

//     // Extract the result of useSelector to a variable
//     const chats = useSelector((state) => state.chats);

//     useEffect(() => {
//         localStorage.setItem('chats', JSON.stringify(chats));
//     }, [chats]); // Use the variable in the dependency array

//     return (
//         <Provider store={store}>
//             <div className="App">
//                 <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} activeChatId={activeChatId} setActiveChatId={setActiveChatId} />
//                 <div className="chat-container">
//                     {isDarkMode ? <img src='/cg-4.png' className="Logo" alt='ChatGenius Logo' width={'250px'}/> : <img src='/cg-5.png' className="Logo" alt='ChatGenius Logo' width={'250px'}/>}
//                     {/* <img src='/cg-4.png' className="Logo" alt='ChatGenius Logo' width={'250px'} /> */}
//                     <DarkModeToggle />
//                     <ChatWindow activeChatId={activeChatId} />
//                     <ChatInput activeChatId={activeChatId} setActiveChatId={setActiveChatId} />
//                     <ToastContainer />
//                 </div>
//             </div>
//         </Provider>
//     );
// }

// export default App;

// App.js
import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import DarkModeToggle from './components/DarkModeToggle';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { setChats, setMessages } from './redux/actions';
import Sidebar from './components/Sidebar';

function App() {
    const [showSidebar, setShowSidebar] = useState(true);
    const dispatch = useDispatch();
    const [activeChatId, setActiveChatId] = useState(null);
    const isDarkMode = useSelector((state) => state.isDarkMode);
    const chats = useSelector((state) => state.chats);

    useEffect(() => {
        const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
        dispatch(setChats(storedChats));
        if (storedChats.length > 0) {
            setActiveChatId(storedChats[0].id);
            const activeChatMessages = storedChats.find(chat => chat.id === storedChats[0].id)?.history || [];
            dispatch(setMessages(activeChatMessages));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(chats));
    }, [chats]);

    const updateChatTitle = (chatId, newTitle) => {
        const updatedChats = chats.map(chat =>
            chat.id === chatId ? { ...chat, title: newTitle } : chat
        );
        dispatch(setChats(updatedChats)); // Corrected line: dispatch the updated chats array
    };

    return (
        <Provider store={store}>
            <div className="App">
                <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} activeChatId={activeChatId} setActiveChatId={setActiveChatId} />
                <div className="chat-container">
                    {isDarkMode ? <img src='/cg-4.png' className="Logo" alt='ChatGenius Logo' width={'250px'}/> : <img src='/cg-5.png' className="Logo" alt='ChatGenius Logo' width={'250px'}/>}
                    <DarkModeToggle />
                    <ChatWindow activeChatId={activeChatId} updateChatTitle={updateChatTitle} />
                    <ChatInput activeChatId={activeChatId} setActiveChatId={setActiveChatId} />
                    <ToastContainer />
                </div>
            </div>
        </Provider>
    );
}

export default App;