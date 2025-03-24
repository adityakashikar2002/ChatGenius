import React, { useEffect, useRef, useState } from "react";
import { typewriterEffect } from "../utils";

function ChatMessage({ message }) {
    const [typedText, setTypedText] = useState("");
    const messageRef = useRef(null);

    useEffect(() => {
        let intervalId; // Store the interval ID

        if (message.sender === "bot") {
            setTypedText(""); // Reset text before starting effect
            intervalId = typewriterEffect(message.text, setTypedText, 20);
        } else {
            setTypedText(message.text);
        }

        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" });
        }

        return () => {
            clearInterval(intervalId); // Clear interval on component unmount
        };
    }, [message.text, message.sender]);

    return (
        <div ref={messageRef} className={`chat-message ${message.sender}`}>
            {typedText}
        </div>
    );
}

export default ChatMessage;
