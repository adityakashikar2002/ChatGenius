// chat-app/src/components/VoiceInput.js (Bonus)
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../redux/actions';
import { sendMessageToGemini } from '../services/gemini';

function VoiceInput() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        let recognition;
        if ('webkitSpeechRecognition' in window) {
            recognition = new window.webkitSpeechRecognition();
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
                    dispatch(addMessage({ text: transcript, sender: 'user' }));
                    sendMessageToGemini(transcript).then(response => {
                        dispatch(addMessage({ text: response, sender: 'bot' }));
                    });
                    setTranscript('');
                }
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };
        } else {
            console.error('Speech recognition not supported in this browser.');
        }

        if (isListening && recognition) {
            recognition.start();
        } else if (recognition) {
            recognition.stop();
        }

        return () => {
            if (recognition) {
                recognition.stop();
            }
        };
    }, [isListening, dispatch, transcript]);

    return (
        <button onClick={() => setIsListening(!isListening)}>
            {isListening ? 'Listening...' : 'Voice Input'}
        </button>
    );
}

export default VoiceInput;