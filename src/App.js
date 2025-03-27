// App.js 
import React, { useState, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/store';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import DarkModeToggle from './components/DarkModeToggle';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { addChat, setChats, updateChat, removeChat, setMessages } from './redux/actions'; // Import setMessages

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
            // Load messages for the active chat
            const activeChatMessages = storedChats.find(chat => chat.id === storedChats[0].id)?.history || [];
            dispatch(setMessages(activeChatMessages));
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('chats', JSON.stringify(chats));
    }, [chats]);

    const handleNewChat = async () => {
        const newChatId = Date.now();
        const newChat = { id: newChatId, title: `New Chat ${newChatId}`, history: [] };
        dispatch(addChat(newChat));
        setActiveChatId(newChatId);
    };

    const handleChatClick = (id) => {
        setActiveChatId(id);
        const selectedChat = chats.find(chat => chat.id === id);
        if (selectedChat) {
            dispatch(setMessages(selectedChat.history || [])); // Dispatch messages for selected chat
        }
    };

    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const updateChatTitle = (chatId, title) => {
        const chatToUpdate = chats.find(chat => chat.id === chatId);
        if (chatToUpdate && chatToUpdate.title !== title) {
            dispatch(updateChat({ ...chatToUpdate, title: title }));
        }
    };

    const handleDeleteChat = (chatId) => {
        dispatch(removeChat(chatId));
        if (activeChatId === chatId) {
            if (chats.length > 1) {
                setActiveChatId(chats.filter(chat => chat.id !== chatId)[0].id);
            } else {
                setActiveChatId(null);
            }
        }
    };

    return (
        <Provider store={store}>
            <div className="App">
                <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
                    <div className="sidebar-header">
                        <button className="sidebar-toggle" onClick={handleToggleSidebar}>
                            ☰
                        </button>
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
                                        <button className="delete-chat-button" onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}>
                                            X
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <div className="chat-container">
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