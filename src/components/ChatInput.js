// chat-app/src/components/ChatInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/actions';
import { sendMessageToGemini } from '../services/gemini';

function ChatInput() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (input.trim()) {
            dispatch(addMessage({ text: input, sender: 'user' }));
            const response = await sendMessageToGemini(input);
            dispatch(addMessage({ text: response, sender: 'bot' }));
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    }

    return (
        <div className="chat-input">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatInput;