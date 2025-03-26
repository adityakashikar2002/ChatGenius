// // WORKS 100
// import React, { useState, useEffect } from 'react';
// import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { addMessage } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';

// function VoiceInput({ editInput }) {
//     const [isListening, setIsListening] = useState(false);
//     const [transcript, setTranscript] = useState('');
//     const dispatch = useDispatch();

//     useEffect(() => {
//         let recognition;
//         if ('webkitSpeechRecognition' in window) {
//             recognition = new window.webkitSpeechRecognition();
//             recognition.continuous = false;
//             recognition.interimResults = false;

//             recognition.onstart = () => {
//                 setIsListening(true);
//             };

//             recognition.onresult = (event) => {
//                 const speech = event.results[0][0].transcript;
//                 setTranscript(speech);
//             };

//             recognition.onend = () => {
//                 setIsListening(false);
//                 if (transcript.trim()) {
//                     if (editInput) {
//                         editInput(transcript);
//                     } else {
//                         dispatch(addMessage({ id: Date.now(), text: transcript, sender: 'user' }));
//                         sendMessageToGemini(transcript).then(response => {
//                             dispatch(addMessage({ id: Date.now(), text: response, sender: 'bot' }));
//                         });
//                     }
//                     setTranscript('');
//                 }
//             };

//             recognition.onerror = (event) => {
//                 console.error('Speech recognition error:', event.error);
//                 setIsListening(false);
//             };
//         } else {
//             console.error('Speech recognition not supported in this browser.');
//         }

//         if (isListening && recognition) {
//             recognition.start();
//         } else if (recognition) {
//             recognition.stop();
//         }

//         return () => {
//             if (recognition) {
//                 recognition.stop();
//             }
//         };
//     }, [isListening, dispatch, transcript, editInput]);

//     return (
//         <button className="voice-input-button" onClick={() => setIsListening(!isListening)}>
//             {isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
//         </button>
//     );
// }

// export default VoiceInput;

// import React, { useState, useEffect } from 'react';
// import { FaMicrophone } from 'react-icons/fa';
// import { useDispatch } from 'react-redux';
// import { addMessage } from '../redux/actions';
// import { sendMessageToGemini } from '../services/gemini';

// function VoiceInput({ editInput }) {
//     const [isListening, setIsListening] = useState(false);
//     const [transcript, setTranscript] = useState('');
//     const dispatch = useDispatch();

//     useEffect(() => {
//         let recognition;
//         if ('webkitSpeechRecognition' in window) {
//             recognition = new window.webkitSpeechRecognition();
//             recognition.continuous = false;
//             recognition.interimResults = false;

//             recognition.onstart = () => {
//                 setIsListening(true);
//             };

//             recognition.onresult = (event) => {
//                 const speech = event.results[0][0].transcript;
//                 setTranscript(speech);
//             };

//             recognition.onend = () => {
//                 setIsListening(false);
//                 if (transcript.trim()) {
//                     if (editInput) {
//                         editInput(transcript);
//                     } else {
//                         dispatch(addMessage({ id: Date.now(), text: transcript, sender: 'user' }));
//                         sendMessageToGemini(transcript).then(response => {
//                             dispatch(addMessage({ id: Date.now(), text: response, sender: 'bot' }));
//                         });
//                     }
//                     setTranscript('');
//                 }
//             };

//             recognition.onerror = (event) => {
//                 console.error('Speech recognition error:', event.error);
//                 setIsListening(false);
//             };
//         } else {
//             console.error('Speech recognition not supported in this browser.');
//         }

//         if (isListening && recognition) {
//             recognition.start();
//         } else if (recognition) {
//             recognition.stop();
//         }

//         return () => {
//             if (recognition) {
//                 recognition.stop();
//             }
//         };
//     }, [isListening, dispatch, transcript, editInput]);

//     return (
//         <div className={`voice-input-container ${isListening ? 'listening' : ''}`}>
//             <button className="voice-input-button">
//                 <FaMicrophone />
//             </button>
//         </div>
//     );
// }

// export default VoiceInput;
import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/actions';
import { sendMessageToGemini } from '../services/gemini';

function VoiceInput({ editInput }) {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null); // Persist recognition instance
    const dispatch = useDispatch();

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
        };

        recognition.onresult = (event) => {
            const speech = event.results[0][0].transcript;
            setTranscript(speech);
        };

        recognition.onend = () => {
            setIsListening(false);
            if (transcript.trim()) {
                if (editInput) {
                    editInput(transcript);
                } else {
                    dispatch(addMessage({ id: Date.now(), text: transcript, sender: 'user' }));
                    sendMessageToGemini(transcript).then(response => {
                        dispatch(addMessage({ id: Date.now(), text: response, sender: 'bot' }));
                    });
                }
                setTranscript('');
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };
    }, [dispatch, editInput, transcript]);

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
