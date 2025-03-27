// import React, { useState, useEffect, useRef } from 'react';
// import { FaMicrophone } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { addMessage } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';

// function VoiceInput({ editInput }) {
//     const [isListening, setIsListening] = useState(false);
//     const [transcript, setTranscript] = useState('');
//     const recognitionRef = useRef(null); // Persist recognition instance
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (!('webkitSpeechRecognition' in window)) {
//             console.error('Speech recognition not supported in this browser.');
//             return;
//         }

//         recognitionRef.current = new window.webkitSpeechRecognition();
//         const recognition = recognitionRef.current;

//         recognition.continuous = false;
//         recognition.interimResults = false;

//         recognition.onstart = () => {
//             setIsListening(true);
//         };

//         recognition.onresult = (event) => {
//             const speech = event.results[0][0].transcript;
//             setTranscript(speech);
//         };

//         recognition.onend = () => {
//             setIsListening(false);
//             if (transcript.trim()) {
//                 if (editInput) {
//                     editInput(transcript);
//                 } else {
//                     dispatch(addMessage({ id: Date.now(), text: transcript, sender: 'user' }));
//                     sendMessageToGemini(transcript).then(response => {
//                         dispatch(addMessage({ id: Date.now(), text: response, sender: 'bot' }));
//                     });
//                 }
//                 setTranscript('');
//             }
//         };

//         recognition.onerror = (event) => {
//             console.error('Speech recognition error:', event.error);
//             setIsListening(false);
//         };
//     }, [dispatch, editInput, transcript]);

//     const toggleListening = () => {
//         if (isListening) {
//             recognitionRef.current.stop();
//         } else {
//             recognitionRef.current.start();
//         }
//     };

//     return (
//         <div className={`voice-input-container ${isListening ? 'listening' : ''}`} onClick={toggleListening}>
//             <button className="voice-input-button">
//                 <FaMicrophone />
//             </button>
//         </div>
//     );
// }

// export default VoiceInput;

// import React, { useState, useEffect, useRef } from 'react';
// import { FaMicrophone } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { addMessage } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';

// function VoiceInput({ editInput }) {
//     const [isListening, setIsListening] = useState(false);
//     const recognitionRef = useRef(null);
//     const transcriptRef = useRef(''); // Store transcript in a ref
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (!('webkitSpeechRecognition' in window)) {
//             console.error('Speech recognition not supported in this browser.');
//             return;
//         }

//         recognitionRef.current = new window.webkitSpeechRecognition();
//         const recognition = recognitionRef.current;

//         recognition.continuous = false;
//         recognition.interimResults = false;

//         recognition.onstart = () => {
//             setIsListening(true);
//             transcriptRef.current = ''; // Reset transcript
//         };

//         recognition.onresult = (event) => {
//             const speech = event.results[0][0].transcript;
//             transcriptRef.current = speech; // Store speech in ref
//         };

//         recognition.onend = () => {
//             setIsListening(false);
//             const finalTranscript = transcriptRef.current.trim();

//             if (finalTranscript) {
//                 if (editInput) {
//                     editInput(finalTranscript);
//                 } else {
//                     dispatch(addMessage({ id: Date.now(), text: finalTranscript, sender: 'user' }));
//                     sendMessageToGemini(finalTranscript).then(response => {
//                         dispatch(addMessage({ id: Date.now(), text: response, sender: 'bot' }));
//                     });
//                 }
//             }
//         };

//         recognition.onerror = (event) => {
//             console.error('Speech recognition error:', event.error);
//             setIsListening(false);
//         };
//     }, [dispatch, editInput]);

//     const toggleListening = () => {
//         if (isListening) {
//             recognitionRef.current.stop();
//         } else {
//             recognitionRef.current.start();
//         }
//     };

//     return (
//         <div className={`voice-input-container ${isListening ? 'listening' : ''}`} onClick={toggleListening}>
//             <button className="voice-input-button">
//                 <FaMicrophone />
//             </button>
//         </div>
//     );
// }

// export default VoiceInput;

import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';

function VoiceInput({ editInput, onVoiceSubmit }) {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);
    const transcriptRef = useRef('');

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            console.error('Speech recognition not supported in this browser.');
            return;
        }

        recognitionRef.current = new window.webkitSpeechRecognition();
        const recognition = recognitionRef.current;

        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            transcriptRef.current = '';
        };

        recognition.onresult = (event) => {
            const speech = event.results[0][0].transcript;
            transcriptRef.current = speech;
        };

        recognition.onend = () => {
            setIsListening(false);
            const finalTranscript = transcriptRef.current.trim();

            if (finalTranscript) {
                editInput(finalTranscript); // Update text input
                onVoiceSubmit(finalTranscript); // Auto-send message
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };
    }, [editInput, onVoiceSubmit]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    return (
        <div className={`voice-input-container ${isListening ? 'listening' : ''}`} onClick={toggleListening}>
            <button className="voice-input-button">
                <FaMicrophone />
            </button>
        </div>
    );
}

export default VoiceInput;

