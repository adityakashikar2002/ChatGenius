// // components/ChatWindow.js
// import React, { useEffect, useRef, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ChatMessage from './ChatMessage';
// import { updateMessages, updateChat, addMessage } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';
// import { generateImage } from '../services/imggen';

// function ChatWindow({ activeChatId, updateChatTitle }) {
//     const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
//     const dispatch = useDispatch();
//     const chats = useSelector((state) => state.chats);
//     const lastMessageRef = useRef(null);
//     const imageGenerationInProgress = useRef(false);

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

//         let updatedMessages = [...messages];
//         updatedMessages[messageToEditIndex] = {
//             ...updatedMessages[messageToEditIndex],
//             text: editedText
//         };

//         dispatch(updateMessages(updatedMessages));

//         if (updatedMessages[messageToEditIndex].sender === 'imagePrompt') {
//             generateImageAndDispatch(editedText);
//         } else {
//             if (botResponseIndex === -1) return;

//             updatedMessages[botResponseIndex] = {
//                 ...updatedMessages[botResponseIndex],
//                 text: "Typing...",
//                 isNewMessage: true
//             };

//             dispatch(updateMessages(updatedMessages));

//             const response = await sendMessageToGemini(editedText, activeChatId);

//             updatedMessages[botResponseIndex] = {
//                 ...updatedMessages[botResponseIndex],
//                 text: response,
//                 isNewMessage: true
//             };

//             dispatch(updateMessages(updatedMessages));

//             const chatHistory = chats.find(chat => chat.id === activeChatId)?.history || [];
//             const updatedChatHistory = chatHistory.map(msg => {
//                 if (msg.id === messages[messageToEditIndex].id) {
//                     return { ...msg, text: editedText };
//                 }
//                 if (msg.id === messages[botResponseIndex].id) {
//                     return { ...msg, text: response };
//                 }
//                 return msg;
//             });

//             dispatch(updateChat({ ...chats.find(chat => chat.id === activeChatId), history: updatedChatHistory }));
//         }
//     };

//     const generateImageAndDispatch = useCallback(async (prompt) => {
//         if (imageGenerationInProgress.current) return;

//         imageGenerationInProgress.current = true;
//         const imgSrc = await generateImage(prompt);
//         if (imgSrc) {
//             dispatch(addMessage({ id: Date.now(), text: imgSrc, sender: 'image', chatId: activeChatId, altText: prompt }));
//         }
//         imageGenerationInProgress.current = false;
//     }, [dispatch, activeChatId]);

//     useEffect(() => {
//         const lastMessage = messages[messages.length - 1];
//         if (lastMessage && lastMessage.sender === 'imagePrompt' && !imageGenerationInProgress.current) {
//             generateImageAndDispatch(lastMessage.text);
//         }
//     }, [messages, generateImageAndDispatch]);

//     return (
//         <div className="chat-window">
//             {messages.map((message, index) => (
//                 <ChatMessage
//                     key={index}
//                     message={message}
//                     onResend={handleResendMessage}
//                     isNewMessage={message.isNewMessage}
//                 />
//             ))}
//             <div ref={lastMessageRef} />
//         </div>
//     );
// }

// export default ChatWindow;
//-------------------------------------------------------------
//-------------------------------------------------------------

// // WORKS 100
// import React, { useEffect, useRef, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ChatMessage from './ChatMessage';
// import { updateMessages, updateChat, addMessage, updateMessage } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';
// import { generateImage } from '../services/imggen';

// function ChatWindow({ activeChatId, updateChatTitle }) {
//     const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
//     const dispatch = useDispatch();
//     const chats = useSelector((state) => state.chats);
//     const lastMessageRef = useRef(null);
//     const imageGenerationInProgress = useRef(false);
//     const imagePromptMessageId = useRef(null);
//     const imageMessageIdToReplace = useRef(null); // Added this ref

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

//         let updatedMessages = [...messages];
//         updatedMessages[messageToEditIndex] = {
//             ...updatedMessages[messageToEditIndex],
//             text: editedText
//         };

//         dispatch(updateMessages(updatedMessages));

//         if (updatedMessages[messageToEditIndex].sender === 'imagePrompt') {
//             imagePromptMessageId.current = messageId;
//             imageMessageIdToReplace.current = messages.find(msg => msg.altText === messages[messageToEditIndex].text && msg.sender === 'image')?.id; // find image id to replace
//             generateImageAndDispatch(editedText);

//             const chatHistory = chats.find(chat => chat.id === activeChatId)?.history || [];
//             const updatedChatHistory = chatHistory.map(msg => {
//                 if (msg.id === messages[messageToEditIndex].id) {
//                     return { ...msg, text: editedText };
//                 }
//                 return msg;
//             });
//             dispatch(updateChat({ ...chats.find(chat => chat.id === activeChatId), history: updatedChatHistory }));
//         } else {
//             if (botResponseIndex === -1) return;

//             updatedMessages[botResponseIndex] = {
//                 ...updatedMessages[botResponseIndex],
//                 text: "Typing...",
//                 isNewMessage: true
//             };

//             dispatch(updateMessages(updatedMessages));

//             const response = await sendMessageToGemini(editedText, activeChatId);

//             updatedMessages[botResponseIndex] = {
//                 ...updatedMessages[botResponseIndex],
//                 text: response,
//                 isNewMessage: true
//             };

//             dispatch(updateMessages(updatedMessages));

//             const chatHistory = chats.find(chat => chat.id === activeChatId)?.history || [];
//             const updatedChatHistory = chatHistory.map(msg => {
//                 if (msg.id === messages[messageToEditIndex].id) {
//                     return { ...msg, text: editedText };
//                 }
//                 if (msg.id === messages[botResponseIndex].id) {
//                     return { ...msg, text: response };
//                 }
//                 return msg;
//             });

//             dispatch(updateChat({ ...chats.find(chat => chat.id === activeChatId), history: updatedChatHistory }));
//         }
//     };

//     const generateImageAndDispatch = useCallback(async (prompt) => {
//         if (imageGenerationInProgress.current) return;

//         imageGenerationInProgress.current = true;
//         const imgSrc = await generateImage(prompt);
//         if (imgSrc) {
//             if (imageMessageIdToReplace.current) {
//                 // Update the existing image message
//                 dispatch(updateMessage({ id: Date.now(), text: imgSrc, sender: 'image', chatId: activeChatId, altText: prompt, replaceId: imageMessageIdToReplace.current }));
//                 imageMessageIdToReplace.current = null;
//                 imagePromptMessageId.current = null;
//             } else {
//                 dispatch(addMessage({ id: Date.now(), text: imgSrc, sender: 'image', chatId: activeChatId, altText: prompt }));
//             }
//         }
//         imageGenerationInProgress.current = false;
//     }, [dispatch, activeChatId]);

//     useEffect(() => {
//         const lastMessage = messages[messages.length - 1];
//         if (lastMessage && lastMessage.sender === 'imagePrompt' && !imageGenerationInProgress.current) {
//             generateImageAndDispatch(lastMessage.text);
//         }
//     }, [messages, generateImageAndDispatch]);

//     return (
//         <div className="chat-window">
//             {messages.map((message, index) => (
//                 <ChatMessage
//                     key={index}
//                     message={message}
//                     onResend={handleResendMessage}
//                     isNewMessage={message.isNewMessage}
//                 />
//             ))}
//             <div ref={lastMessageRef} />
//         </div>
//     );
// }

// export default ChatWindow;
//---------------------------------
//-----------------------------------


// // WORKS LIT 1000000..
// import React, { useEffect, useRef, useCallback, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ChatMessage from './ChatMessage';
// import { updateMessages, updateChat, addMessage, updateMessage, incrementImageCount } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';
// import { generateImage } from '../services/imggen';
// import Popup from './Popup';

// function ChatWindow({ activeChatId, updateChatTitle }) {
//     const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
//     const dispatch = useDispatch();
//     const chats = useSelector((state) => state.chats);
//     const lastMessageRef = useRef(null);
//     const imageGenerationInProgress = useRef(false);
//     const imagePromptMessageId = useRef(null);
//     const imageMessageIdToReplace = useRef(null);
//     const [showPopup, setShowPopup] = useState(false);

//     const activeChat = chats.find(chat => chat.id === activeChatId);
//     const imageCount = activeChat?.imageGenerationCount || 0;

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

//         let updatedMessages = [...messages];
//         updatedMessages[messageToEditIndex] = {
//             ...updatedMessages[messageToEditIndex],
//             text: editedText
//         };

//         dispatch(updateMessages(updatedMessages));

//         if (updatedMessages[messageToEditIndex].sender === 'imagePrompt') {
//             imagePromptMessageId.current = messageId;
//             imageMessageIdToReplace.current = messages.find(msg => msg.altText === messages[messageToEditIndex].text && msg.sender === 'image')?.id;
//             generateImageAndDispatch(editedText);

//             const chatHistory = chats.find(chat => chat.id === activeChatId)?.history || [];
//             const updatedChatHistory = chatHistory.map(msg => {
//                 if (msg.id === messages[messageToEditIndex].id) {
//                     return { ...msg, text: editedText };
//                 }
//                 return msg;
//             });
//             dispatch(updateChat({ ...chats.find(chat => chat.id === activeChatId), history: updatedChatHistory }));
//         } else {
//             if (botResponseIndex === -1) return;

//             updatedMessages[botResponseIndex] = {
//                 ...updatedMessages[botResponseIndex],
//                 text: "Typing...",
//                 isNewMessage: true
//             };

//             dispatch(updateMessages(updatedMessages));

//             const response = await sendMessageToGemini(editedText, activeChatId);

//             updatedMessages[botResponseIndex] = {
//                 ...updatedMessages[botResponseIndex],
//                 text: response,
//                 isNewMessage: true
//             };

//             dispatch(updateMessages(updatedMessages));

//             const chatHistory = chats.find(chat => chat.id === activeChatId)?.history || [];
//             const updatedChatHistory = chatHistory.map(msg => {
//                 if (msg.id === messages[messageToEditIndex].id) {
//                     return { ...msg, text: editedText };
//                 }
//                 if (msg.id === messages[botResponseIndex].id) {
//                     return { ...msg, text: response };
//                 }
//                 return msg;
//             });

//             dispatch(updateChat({ ...chats.find(chat => chat.id === activeChatId), history: updatedChatHistory }));
//         }
//     };

//     const generateImageAndDispatch = useCallback(async (prompt) => {
//         if (imageGenerationInProgress.current) return;

//         if (imageCount >= 3) {
//             setShowPopup(true);
//             return;
//         }

//         imageGenerationInProgress.current = true;
//         const imgSrc = await generateImage(prompt);
//         if (imgSrc) {
//             dispatch(incrementImageCount(activeChatId));
//             if (imageMessageIdToReplace.current) {
//                 dispatch(updateMessage({ id: Date.now(), text: imgSrc, sender: 'image', chatId: activeChatId, altText: prompt, replaceId: imageMessageIdToReplace.current }));
//                 imageMessageIdToReplace.current = null;
//                 imagePromptMessageId.current = null;
//             } else {
//                 dispatch(addMessage({ id: Date.now(), text: imgSrc, sender: 'image', chatId: activeChatId, altText: prompt }));
//             }
//         }
//         imageGenerationInProgress.current = false;
//     }, [dispatch, activeChatId, imageCount]);

//     useEffect(() => {
//         const lastMessage = messages[messages.length - 1];
//         if (lastMessage && lastMessage.sender === 'imagePrompt' && !imageGenerationInProgress.current) {
//             generateImageAndDispatch(lastMessage.text);
//         }
//     }, [messages, generateImageAndDispatch]);

//     return (
//         <div className="chat-window">
//             {showPopup && (
//                 <Popup
//                     message="You have reached the maximum image generation limit. Please upgrade your plan."
//                     onClose={() => setShowPopup(false)}
//                 />
//             )}
//             {messages.map((message, index) => (
//                 <ChatMessage
//                     key={index}
//                     message={message}
//                     onResend={handleResendMessage}
//                     isNewMessage={message.isNewMessage}
//                 />
//             ))}
//             <div ref={lastMessageRef} />
//         </div>
//     );
// }

// export default ChatWindow;

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatMessage from './ChatMessage';
import { updateMessages, updateChat, addMessage, updateMessage, incrementImageCount } from '../redux/actions';
import { sendMessageToGemini } from '../services/gemini';
import { generateImage } from '../services/imggen';
import Popup from './Popup';

function ChatWindow({ activeChatId, updateChatTitle }) {
    const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chats);
    const lastMessageRef = useRef(null);
    const imageGenerationInProgress = useRef(false);
    const imagePromptMessageId = useRef(null);
    const imageMessageIdToReplace = useRef(null);
    const [showPopup, setShowPopup] = useState(false);

    const activeChat = chats.find(chat => chat.id === activeChatId);
    const imageCount = activeChat?.imageGenerationCount || 0;

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

        let updatedMessages = [...messages];
        updatedMessages[messageToEditIndex] = {
            ...updatedMessages[messageToEditIndex],
            text: editedText
        };

        dispatch(updateMessages(updatedMessages));

        if (updatedMessages[messageToEditIndex].sender === 'imagePrompt') {
            imagePromptMessageId.current = messageId;
            imageMessageIdToReplace.current = messages.find(msg => msg.altText === messages[messageToEditIndex].text && msg.sender === 'image')?.id;
            generateImageAndDispatch(editedText);

            const chatHistory = chats.find(chat => chat.id === activeChatId)?.history || [];
            const updatedChatHistory = chatHistory.map(msg => {
                if (msg.id === messages[messageToEditIndex].id) {
                    return { ...msg, text: editedText };
                }
                return msg;
            });
            dispatch(updateChat({ ...chats.find(chat => chat.id === activeChatId), history: updatedChatHistory }));
        } else {
            if (botResponseIndex === -1) return;

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

            dispatch(updateMessages(updatedMessages));

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
        }
    };

    const generateImageAndDispatch = useCallback(async (prompt) => {
        if (imageGenerationInProgress.current) return;

        if (imageCount >= 3) {
            setShowPopup(true);
            return;
        }

        imageGenerationInProgress.current = true;
        const imgSrc = await generateImage(prompt);
        if (imgSrc) {
            dispatch(incrementImageCount(activeChatId));
            if (imageMessageIdToReplace.current) {
                dispatch(updateMessage({ id: Date.now(), text: imgSrc, sender: 'image', chatId: activeChatId, altText: prompt, replaceId: imageMessageIdToReplace.current }));
                imageMessageIdToReplace.current = null;
                imagePromptMessageId.current = null;
            } else {
                dispatch(addMessage({ id: Date.now(), text: imgSrc, sender: 'image', chatId: activeChatId, altText: prompt }));
            }
        }
        imageGenerationInProgress.current = false;
    }, [dispatch, activeChatId, imageCount]);

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.sender === 'imagePrompt' && !imageGenerationInProgress.current) {
            generateImageAndDispatch(lastMessage.text);
        }
    }, [messages, generateImageAndDispatch]);

    const handleClose = () => {
        console.log("Popup closed");
        setShowPopup(false);
    };
    
    return (
        <div className="chat-window">
            {showPopup && (
                <Popup
                    message="You have reached the maximum image generation limit. Please upgrade your plan. Refresh the page."
                    onClose={handleClose} // ✅ This ensures the popup closes
                />
            )}
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
