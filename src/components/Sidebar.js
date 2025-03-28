// // components/Sidebar.js
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addChat, removeChat, setMessages } from '../redux/actions';

// function Sidebar({ showSidebar, setShowSidebar, activeChatId, setActiveChatId }) {
//     const chats = useSelector((state) => state.chats);
//     const dispatch = useDispatch();

//     const handleNewChat = async () => {
//         const newChatId = Date.now();
//         const newChat = { id: newChatId, title: `New Chat`, history: [] };
//         dispatch(addChat(newChat));
//         setActiveChatId(newChatId);
//     };

//     const handleChatClick = (id) => {
//         setActiveChatId(id);
//         const selectedChat = chats.find(chat => chat.id === id);
//         if (selectedChat) {
//             dispatch(setMessages(selectedChat.history || []));
//         }
//     };

//     const handleDeleteChat = (chatId, event) => {
//         event.stopPropagation();
//         dispatch(removeChat(chatId));
//         if (activeChatId === chatId) {
//             if (chats.length > 1) {
//                 setActiveChatId(chats.filter(chat => chat.id !== chatId)[0].id);
//             } else {
//                 setActiveChatId(null);
//             }
//         }
//     };

//     const handleToggleSidebar = () => {
//         setShowSidebar(!showSidebar);
//     };

//     return (
//         <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
//             <div className="sidebar-header">
//                 <button className="sidebar-toggle" onClick={handleToggleSidebar}>
//                     ☰
//                 </button>
//                 <button className="new-chat-button" onClick={handleNewChat}>
//                     <img src="/plus.png" alt="+" width="25px" style={{ marginRight: '8px'}} />
//                     {showSidebar ? "New Chat" : null}
//                 </button>
//             </div>
//             {showSidebar && (
//                 <div className="sidebar-content">
//                     <h2>Recent</h2>
//                     <ul>
//                         {chats.map(chat => (
//                             <li key={chat.id}
//                                 className={activeChatId === chat.id ? 'active' : ''}
//                                 onClick={() => handleChatClick(chat.id)}>
//                                 {chat.title}
//                                 <button className="delete-chat-button" onClick={(e) => handleDeleteChat(chat.id, e)}>
//                                     <img src="/delete-icon2.svg" alt="Delete" width="25" height="25" />
//                                 </button>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Sidebar;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChat, removeChat, setMessages } from '../redux/actions';
import { generateImage } from '../services/imggen';

function Sidebar({ showSidebar, setShowSidebar, activeChatId, setActiveChatId }) {
    const chats = useSelector((state) => state.chats);
    const dispatch = useDispatch();
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    const handleNewChat = () => {
        const newChatId = Date.now();
        const newChat = { id: newChatId, title: `New Chat`, history: [] };
        dispatch(addChat(newChat));
        setActiveChatId(newChatId);
    };

    const handleChatClick = (id) => {
        setActiveChatId(id);
        const selectedChat = chats.find(chat => chat.id === id);
        if (selectedChat) {
            dispatch(setMessages(selectedChat.history || []));
        }
    };

    const handleDeleteChat = (chatId, event) => {
        event.stopPropagation();
        dispatch(removeChat(chatId));
        if (activeChatId === chatId) {
            if (chats.length > 1) {
                setActiveChatId(chats.filter(chat => chat.id !== chatId)[0].id);
            } else {
                setActiveChatId(null);
            }
        }
    };

    const handleToggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleGenerateImage = async () => {
        if (!prompt.trim()) return;
        const imgSrc = await generateImage(prompt);
        if (imgSrc) {
            setImageUrl(imgSrc);
        }
    };

    return (
        <div className={`sidebar ${showSidebar ? 'show' : 'hide'}`}>
            <div className="sidebar-header">
                <button className="sidebar-toggle" onClick={handleToggleSidebar}>
                    ☰
                </button>
                <button className="new-chat-button" onClick={handleNewChat}>
                    <img src="/plus.png" alt="+" width="25px" style={{ marginRight: '8px' }} />
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
                                <button className="delete-chat-button" onClick={(e) => handleDeleteChat(chat.id, e)}>
                                    <img src="/delete-icon2.svg" alt="Delete" width="25" height="25" />
                                </button>
                            </li>
                        ))}
                    </ul>

                    {/* Image Generation Section */}
                    <div className="image-generator">
                        <input
                            type="text"
                            placeholder="Enter image prompt..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            className="image-prompt-input"
                        />
                        <button className="generate-image-button" onClick={handleGenerateImage}>
                            Generate Image
                        </button>
                        {imageUrl && <img src={imageUrl} alt="Generated" className="generated-image" />}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
