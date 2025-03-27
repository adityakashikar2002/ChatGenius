// components/ChatWindow.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatMessage from './ChatMessage';
import { updateMessages } from '../redux/actions';
import { sendMessageToGemini } from '../services/gemini';

function ChatWindow({ activeChatId, updateChatTitle }) {
    const messages = useSelector((state) => state.messages.filter(msg => msg.chatId === activeChatId));
    const dispatch = useDispatch();
    const chats = useSelector((state) => state.chats);

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
        let botResponseIndex = -1;

        for (let i = messageToEditIndex + 1; i < messages.length; i++) {
            if (messages[i].sender === 'bot') {
                botResponseIndex = i;
                break;
            }
        }

        const updatedMessages = messages.map((msg, index) => {
            if (index === messageToEditIndex) {
                return { ...msg, text: editedText };
            }
            if (botResponseIndex !== -1 && index === botResponseIndex) {
                return { ...msg, text: "Loading..." };
            }
            return msg;
        });

        dispatch(updateMessages(updatedMessages));

        const response = await sendMessageToGemini(editedText, activeChatId);

        const finalUpdatedMessages = messages.map((msg, index) => {
            if (index === messageToEditIndex) {
                return { ...msg, text: editedText };
            }
            if (botResponseIndex !== -1 && index === botResponseIndex) {
                return { ...msg, text: response };
            }
            return msg;
        });

        dispatch(updateMessages(finalUpdatedMessages));
    };

    return (
        <div className="chat-window">
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} onResend={handleResendMessage} />
            ))}
        </div>
    );
}

export default ChatWindow;