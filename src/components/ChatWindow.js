// components/ChatWindow.js
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




