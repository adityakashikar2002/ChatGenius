// chat-app/src/components/ChatWindow.js
import React from 'react';
import { useSelector } from 'react-redux';
import ChatMessage from './ChatMessage';

function ChatWindow() {
    const messages = useSelector((state) => state.messages);

    return (
        <div className="chat-window">
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
            ))}
        </div>
    );
}

export default ChatWindow;