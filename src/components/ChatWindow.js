// // components/ChatWindow.js
// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ChatMessage from './ChatMessage';
// import { updateMessages } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';

// function ChatWindow({ activeChatId, updateChatTitle }) {
//     const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
//     const dispatch = useDispatch();
//     const chats = useSelector((state) => state.chats);

//     useEffect(() => {
//         if (messages.length > 0 && messages[0].sender === 'user') {
//             const activeChat = chats.find(chat => chat.id === activeChatId);
//             if (activeChat && activeChat.title.startsWith('New Chat')) {
//                 updateChatTitle(activeChatId, messages[0].text.substring(0, 20));
//             }
//         }
//     }, [messages, activeChatId, updateChatTitle, chats]);

//     const handleResendMessage = async (editedText, messageId) => {
//         const messageToEditIndex = messages.findIndex(msg => msg.id === messageId);
//         let botResponseIndex = -1;

//         for (let i = messageToEditIndex + 1; i < messages.length; i++) {
//             if (messages[i].sender === 'bot') {
//                 botResponseIndex = i;
//                 break;
//             }
//         }

//         const updatedMessages = messages.map((msg, index) => {
//             if (index === messageToEditIndex) {
//                 return { ...msg, text: editedText };
//             }
//             if (botResponseIndex !== -1 && index === botResponseIndex) {
//                 return { ...msg, text: "Loading..." };
//             }
//             return msg;
//         });

//         dispatch(updateMessages(updatedMessages));

//         const response = await sendMessageToGemini(editedText, activeChatId);

//         const finalUpdatedMessages = messages.map((msg, index) => {
//             if (index === messageToEditIndex) {
//                 return { ...msg, text: editedText };
//             }
//             if (botResponseIndex !== -1 && index === botResponseIndex) {
//                 return { ...msg, text: response };
//             }
//             return msg;
//         });

//         dispatch(updateMessages(finalUpdatedMessages));
//     };

//     return (
//         <div className="chat-window">
//             {messages.map((message, index) => (
//                 <ChatMessage key={index} message={message} onResend={handleResendMessage} />
//             ))}
//         </div>
//     );
// }

// export default ChatWindow;
// // components/ChatWindow.js
// import React, { useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ChatMessage from './ChatMessage';
// import { updateMessages } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';

// function ChatWindow({ activeChatId, updateChatTitle }) {
//     const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
//     const dispatch = useDispatch();
//     const chats = useSelector((state) => state.chats);
//     const lastMessageRef = useRef(null);

//     useEffect(() => {
//         if (messages.length > 0 && messages[0].sender === 'user') {
//             const activeChat = chats.find(chat => chat.id === activeChatId);
//             if (activeChat && activeChat.title.startsWith('New Chat')) {
//                 updateChatTitle(activeChatId, messages[0].text.substring(0, 20));
//             }
//         }
//     }, [messages, activeChatId, updateChatTitle, chats]);

//     const handleResendMessage = async (editedText, messageId) => {
//         const messageToEditIndex = messages.findIndex(msg => msg.id === messageId);
//         let botResponseIndex = -1;

//         for (let i = messageToEditIndex + 1; i < messages.length; i++) {
//             if (messages[i].sender === 'bot') {
//                 botResponseIndex = i;
//                 break;
//             }
//         }

//         const updatedMessages = messages.map((msg, index) => {
//             if (index === messageToEditIndex) {
//                 return { ...msg, text: editedText };
//             }
//             if (botResponseIndex !== -1 && index === botResponseIndex) {
//                 return { ...msg, text: "Loading..." };
//             }
//             return msg;
//         });

//         dispatch(updateMessages(updatedMessages));

//         const response = await sendMessageToGemini(editedText, activeChatId);

//         const finalUpdatedMessages = messages.map((msg, index) => {
//             if (index === messageToEditIndex) {
//                 return { ...msg, text: editedText };
//             }
//             if (botResponseIndex !== -1 && index === botResponseIndex) {
//                 return { ...msg, text: response };
//             }
//             return msg;
//         });

//         dispatch(updateMessages(finalUpdatedMessages));
//     };

//     return (
//         <div className="chat-window">
//             {messages.map((message, index) => (
//                 <ChatMessage
//                     key={index}
//                     message={message}
//                     onResend={handleResendMessage}
//                     isNewMessage={index === messages.length - 1 && message.sender === 'bot'} // Pass isNewMessage prop
//                 />
//             ))}
//             <div ref={lastMessageRef} />
//         </div>
//     );
// }

// export default ChatWindow;
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ChatMessage from './ChatMessage';
// import { updateMessages } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';

// function ChatWindow({ activeChatId, updateChatTitle }) {
//     const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
//     const dispatch = useDispatch();
//     const chats = useSelector((state) => state.chats);
//     const lastMessageRef = useRef(null);

//     useEffect(() => {
//         if (messages.length > 0 && messages[0].sender === 'user') {
//             const activeChat = chats.find(chat => chat.id === activeChatId);
//             if (activeChat && activeChat.title.startsWith('New Chat')) {
//                 updateChatTitle(activeChatId, messages[0].text.substring(0, 20));
//             }
//         }
//     }, [messages, activeChatId, updateChatTitle, chats]);

//     const handleResendMessage = async (editedText, messageId) => {
//         const messageToEditIndex = messages.findIndex(msg => msg.id === messageId);
//         let botResponseIndex = -1;

//         for (let i = messageToEditIndex + 1; i < messages.length; i++) {
//             if (messages[i].sender === 'bot') {
//                 botResponseIndex = i;
//                 break;
//             }
//         }

//         const updatedMessages = messages.map((msg, index) => {
//             if (index === messageToEditIndex) {
//                 return { ...msg, text: editedText };
//             }
//             if (botResponseIndex !== -1 && index === botResponseIndex) {
//                 return { ...msg, text: "Loading...", isNewMessage: true };
//             }
//             return msg;
//         });

//         dispatch(updateMessages(updatedMessages));

//         const response = await sendMessageToGemini(editedText, activeChatId);

//         const finalUpdatedMessages = messages.map((msg, index) => {
//             if (index === messageToEditIndex) {
//                 return { ...msg, text: editedText };
//             }
//             if (botResponseIndex !== -1 && index === botResponseIndex) {
//                 return { ...msg, text: response, isNewMessage: false }; // Ensure message is no longer new
//             }
//             return msg;
//         });

//         dispatch(updateMessages(finalUpdatedMessages));
//     };

//     return (
//         <div className="chat-window">
//             {messages.map((message, index) => (
//                 <ChatMessage
//                     key={index}
//                     message={message}
//                     onResend={handleResendMessage}
//                     isNewMessage={message.isNewMessage} // Use stored flag
//                 />
//             ))}
//             <div ref={lastMessageRef} />
//         </div>
//     );
// }

// export default ChatWindow;
// import React, { useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ChatMessage from './ChatMessage';
// import { updateMessages } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';

// function ChatWindow({ activeChatId, updateChatTitle }) {
//     const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
//     const dispatch = useDispatch();
//     const chats = useSelector((state) => state.chats);
//     const lastMessageRef = useRef(null);

//     // Function to find the last bot message index
//     const findLastBotMessageIndex = (userMessageIndex) => {
//         return messages.findIndex((msg, index) => index > userMessageIndex && msg.sender === 'bot');
//     };

//     useEffect(() => {
//         if (messages.length > 0 && messages[0].sender === 'user') {
//             const activeChat = chats.find(chat => chat.id === activeChatId);
//             if (activeChat && activeChat.title.startsWith('New Chat')) {
//                 updateChatTitle(activeChatId, messages[0].text.substring(0, 20));
//             }
//         }
//     }, [messages, activeChatId, updateChatTitle, chats]);

//     const handleResendMessage = async (editedText, messageId) => {
//         const messageToEditIndex = messages.findIndex(msg => msg.id === messageId);
//         if (messageToEditIndex === -1) return;

//         let botResponseIndex = findLastBotMessageIndex(messageToEditIndex);

//         if (botResponseIndex === -1) return;

//         // Create a new messages array with updated user message
//         let updatedMessages = [...messages];
//         updatedMessages[messageToEditIndex] = { 
//             ...updatedMessages[messageToEditIndex], 
//             text: editedText 
//         };

//         // Temporarily update bot message to show "Typing..."
//         updatedMessages[botResponseIndex] = { 
//             ...updatedMessages[botResponseIndex], 
//             text: "Typing...", 
//             isNewMessage: true 
//         };

//         // Dispatch updated messages before sending the API call
//         dispatch(updateMessages(updatedMessages));

//         // Fetch new bot response
//         const response = await sendMessageToGemini(editedText, activeChatId);

//         // Overwrite the bot's response in the same position
//         updatedMessages[botResponseIndex] = { 
//             ...updatedMessages[botResponseIndex], 
//             text: response, 
//             isNewMessage: true 
//         };

//         // Dispatch updated messages to **persist in chat history**
//         dispatch(updateMessages(updatedMessages));
//     };

//     return (
//         <div className="chat-window">
//             {messages.map((message, index) => (
//                 <ChatMessage
//                     key={index}
//                     message={message}
//                     onResend={handleResendMessage}
//                     isNewMessage={message.isNewMessage} // Ensures animation triggers correctly
//                 />
//             ))}
//             <div ref={lastMessageRef} />
//         </div>
//     );
// }

// export default ChatWindow;

// ChatWindow.js (Modified)
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatMessage from './ChatMessage';
import { updateMessages, updateChat } from '../redux/actions'; // Import updateChat
import { sendMessageToGemini } from '../services/gemini';

function ChatWindow({ activeChatId, updateChatTitle }) {
    const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chats);
    const lastMessageRef = useRef(null);

    const findLastBotMessageIndex = (userMessageIndex) => {
        return messages.findIndex((msg, index) => index > userMessageIndex && msg.sender === 'bot');
    };

    useEffect(() => {
        if (messages.length > 0 && messages[0].sender === 'user') {
            const activeChat = chats.find(chat => chat.id === activeChatId);
            if (activeChat && activeChat.title.startsWith('New Chat')) {
                updateChatTitle(activeChatId, messages[0].text.substring(0, 20));
            }
        }
    }, [messages, activeChatId, updateChatTitle, chats]);

    const handleResendMessage = async (editedText, messageId) => {
        const messageToEditIndex = messages.findIndex(msg => msg.id === messageId);
        if (messageToEditIndex === -1) return;

        let botResponseIndex = findLastBotMessageIndex(messageToEditIndex);

        if (botResponseIndex === -1) return;

        let updatedMessages = [...messages];
        updatedMessages[messageToEditIndex] = {
            ...updatedMessages[messageToEditIndex],
            text: editedText
        };

        updatedMessages[botResponseIndex] = {
            ...updatedMessages[botResponseIndex],
            text: "Typing...",
            isNewMessage: true
        };

        dispatch(updateMessages(updatedMessages));

        const response = await sendMessageToGemini(editedText, activeChatId);

        updatedMessages[botResponseIndex] = {
            ...updatedMessages[botResponseIndex],
            text: response,
            isNewMessage: true
        };

        // Replace the old messages with the new edited one and the new response
        dispatch(updateMessages(updatedMessages));

        // Update chat history (Replace old messages)
        const chatHistory = chats.find(chat => chat.id === activeChatId)?.history || [];
        const updatedChatHistory = chatHistory.map(msg => {
            if (msg.id === messages[messageToEditIndex].id) {
                return { ...msg, text: editedText };
            }
            if (msg.id === messages[botResponseIndex].id) {
                return { ...msg, text: response };
            }
            return msg;
        });

        dispatch(updateChat({ ...chats.find(chat => chat.id === activeChatId), history: updatedChatHistory }));
    };

    return (
        <div className="chat-window">
            {messages.map((message, index) => (
                <ChatMessage
                    key={index}
                    message={message}
                    onResend={handleResendMessage}
                    isNewMessage={message.isNewMessage}
                />
            ))}
            <div ref={lastMessageRef} />
        </div>
    );
}

export default ChatWindow;




