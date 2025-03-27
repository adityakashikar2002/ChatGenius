//components/VoiceInput.js
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

