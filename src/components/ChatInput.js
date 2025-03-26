// //WORKS 100
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addMessage } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';
// import VoiceInput from './VoiceInput';

// function ChatInput() {
//     const [input, setInput] = useState('');
//     const dispatch = useDispatch();

//     const handleInputChange = (e) => {
//         setInput(e.target.value);
//     };

//     const handleSendMessage = async () => {
//         if (input.trim()) {
//             dispatch(addMessage({ text: input, sender: 'user' }));
//             const response = await sendMessageToGemini(input);
//             dispatch(addMessage({ text: response, sender: 'bot' }));
//             setInput('');
//         }
//     };

//     const handleKeyDown = (e) => {
//         if (e.key === 'Enter') {
//             handleSendMessage();
//         }
//     };

//     return (
//         <div className="chat-input">
//             <VoiceInput />
//             <input
//                 type="text"
//                 value={input}
//                 onChange={handleInputChange}
//                 onKeyDown={handleKeyDown}
//                 placeholder="Type your message..."
//             />
//             <button onClick={handleSendMessage}>Send</button>
//         </div>
//     );
// }

// export default ChatInput;

import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/actions';
import { sendMessageToGemini } from '../services/gemini';
import VoiceInput from './VoiceInput';

function ChatInput() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();
    const voiceInputRef = useRef(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSendMessage = async () => {
        if (input.trim()) {
            dispatch(addMessage({ id: Date.now(), text: input, sender: 'user' }));
            const response = await sendMessageToGemini(input);
            dispatch(addMessage({ id: Date.now(), text: response, sender: 'bot' }));
            setInput('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-input">
            <VoiceInput editRef={voiceInputRef} editInput={setInput} />
            <input ref={voiceInputRef}
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