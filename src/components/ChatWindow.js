// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import ChatMessage from './ChatMessage';
// import { updateMessages } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';

// function ChatWindow() {
//     const messages = useSelector((state) => state.messages);
//     const dispatch = useDispatch();

//     const handleResendMessage = async (editedText, messageId) => { // Receive messageId
//         const messageToEditIndex = messages.findIndex(msg => msg.id === messageId); // Find by ID
//         let botResponseIndex = -1;

//         // Find the index of the bot response message
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

//         const response = await sendMessageToGemini(editedText);

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

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChatMessage from './ChatMessage';
import { updateMessages } from '../redux/actions';
import { sendMessageToGemini } from '../services/gemini';

function ChatWindow() {
    const messages = useSelector((state) => state.messages);
    const dispatch = useDispatch();

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

        const response = await sendMessageToGemini(editedText);

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