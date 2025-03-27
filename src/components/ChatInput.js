// components/ChatInput.js
import React, { useState, useRef } from 'react';
import { useDispatch} from 'react-redux';
import { addMessage, addChat } from '../redux/actions';
import { sendMessageToGemini } from '../services/gemini';
import VoiceInput from './VoiceInput';

function ChatInput({ activeChatId, setActiveChatId }) {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const voiceInputRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async (message) => {
        const text = message || input.trim();
        if (text) {
            let chatId = activeChatId;

            // Check if it's the first prompt and no chats exist
            if (!chatId) {
                const newChatId = Date.now();
                dispatch(addChat({ id: newChatId, title: text.substring(0, 20), history: [] }));
                setActiveChatId(newChatId);
                chatId = newChatId;
            }

            dispatch(addMessage({ id: Date.now(), text, sender: 'user', chatId: chatId }));

            // Add a small delay to ensure chat title is updated
            setTimeout(async () => {
                const response = await sendMessageToGemini(text, chatId);
                dispatch(addMessage({ id: Date.now(), text: response, sender: 'bot', chatId: chatId }));
                setInput('');
            }, 100);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-input">
            <VoiceInput editInput={setInput} onVoiceSubmit={handleSendMessage} />
            <input
                ref={voiceInputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
            />
            <button onClick={() => handleSendMessage()}>Send</button>
        </div>
    );
}

export default ChatInput;