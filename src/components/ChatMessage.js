// components/ChatMessage.js
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaEdit, FaRedo, FaCopy, FaDownload } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { typewriterEffect } from "../utils";

function ChatMessage({ message, onResend, isNewMessage }) {
    const [typedText, setTypedText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(message.text);
    const messageRef = useRef(null);
    const hasRun = useRef(false);
    const isDarkMode = document.body.classList.contains('dark-mode'); // Check if dark mode is active

    useEffect(() => {
        let intervalId;

        if (message.sender === "bot" && message.text) {
            setTypedText("");
            hasRun.current = false;

            if (isNewMessage && !hasRun.current) {
                intervalId = typewriterEffect(message.text, setTypedText, 20);
                hasRun.current = true;
            } else {
                setTypedText(message.text);
            }
        } else if (message.sender === "image") {
            setTypedText(message.text); // Directly set the image URL
        } else {
            setTypedText(message.text);
        }

        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" });
        }

        return () => clearInterval(intervalId);
    }, [message.text, message.sender, isNewMessage]);

    const handleEditClick = () => setIsEditing(true);

    const handleResendClick = () => {
        onResend(editedText, message.id);
        setIsEditing(false);
        hasRun.current = false;
    };

    const handleCopyClick = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Code copied!");
    };

    const handleDownloadImage = (imageUrl) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'generated-image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const renderMarkdown = (text) => (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            children={text}
            components={{
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const language = match ? match[1] : "";
                    const codeString = String(children).replace(/\n$/, "");

                    return !inline && language ? (
                        <div style={{ position: 'relative' }}>
                            <SyntaxHighlighter
                                children={codeString}
                                style={dracula}
                                language={language}
                                PreTag="div"
                                {...props}
                            />
                            <button className="copy-button" onClick={() => handleCopyClick(codeString)}>
                                <FaCopy />
                            </button>
                        </div>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    );
                },
            }}
        />
    );

    return (
        <div ref={messageRef} className={`chat-message-container ${message.sender}`}>
            <ToastContainer />
            {message.sender === "user" || message.sender === "imagePrompt" ? (
                <button className="edit-button-left" onClick={handleEditClick}>
                    <FaEdit />
                </button>
            ) : null}
            <div className={`chat-message ${message.sender} ${isDarkMode ? 'dark-mode-message' : 'light-mode-message'}`}>
                {isEditing && (message.sender === "user" || message.sender === "imagePrompt") ? (
                    <div>
                        <textarea
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="edit-textarea"
                        />
                        <button className="resend-button" onClick={handleResendClick}>
                            <FaRedo />
                        </button>
                    </div>
                ) : (
                    <div>
                        {message.editedText && (message.sender === "user" || message.sender === "imagePrompt") && (
                            <div>
                                <p>Original: {message.text}</p>
                                <p>Edited: {message.editedText}</p>
                            </div>
                        )}
                        {message.sender === "bot" ? renderMarkdown(typedText) :
                            message.sender === "image" && typedText ? (
                                <div style={{ position: 'relative' }}>
                                    <img src={typedText} alt={message.altText || "Generated Image"} className="generated-image-chat" />
                                    <button className="download-button" onClick={() => handleDownloadImage(typedText)}>
                                        <FaDownload />
                                    </button>
                                </div>
                            ) : message.sender === "image" ? null : typedText}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatMessage;