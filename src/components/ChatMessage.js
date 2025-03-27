// // components/ChatMessage.js
// import React, { useEffect, useRef, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { FaEdit, FaRedo, FaCopy } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { typewriterEffect } from "../utils";

// function ChatMessage({ message, onResend }) {
//     const [typedText, setTypedText] = useState("");
//     const [isEditing, setIsEditing] = useState(false);
//     const [editedText, setEditedText] = useState(message.text);
//     const messageRef = useRef(null);
//     const hasRun = useRef(false);

//     useEffect(() => {
//         let intervalId;

//         if (message.sender === "bot") {
//             setTypedText("");
//             hasRun.current = false; // Reset for each new bot message

//             if (!hasRun.current) {
//                 intervalId = typewriterEffect(message.text, setTypedText, 20);
//                 hasRun.current = true;
//             } else {
//                 setTypedText(message.text); // If already run, display immediately
//             }
//         } else {
//             setTypedText(message.text);
//         }

//         if (messageRef.current) {
//             messageRef.current.scrollIntoView({ behavior: "smooth" });
//         }

//         return () => clearInterval(intervalId);
//     }, [message.text, message.sender]);

//     const handleEditClick = () => setIsEditing(true);

//     const handleResendClick = () => {
//         onResend(editedText, message.id);
//         setIsEditing(false);
//         hasRun.current = false; // Reset for new bot response
//     };

//     const handleCopyClick = (text) => {
//         navigator.clipboard.writeText(text);
//         toast.success("Code copied!");
//     };

//     const renderMarkdown = (text) => (
//         <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             children={text}
//             components={{
//                 code({ node, inline, className, children, ...props }) {
//                     const match = /language-(\w+)/.exec(className || "");
//                     const language = match ? match[1] : "";
//                     const codeString = String(children).replace(/\n$/, "");

//                     return !inline && language ? (
//                         <div style={{ position: 'relative' }}>
//                             <SyntaxHighlighter
//                                 children={codeString}
//                                 style={dracula}
//                                 language={language}
//                                 PreTag="div"
//                                 {...props}
//                             />
//                             <button className="copy-button" onClick={() => handleCopyClick(codeString)}>
//                                 <FaCopy />
//                             </button>
//                         </div>
//                     ) : (
//                         <code className={className} {...props}>
//                             {children}
//                         </code>
//                     );
//                 },
//             }}
//         />
//     );

//     return (
//         <div ref={messageRef} className={`chat-message-container ${message.sender}`}>
//             <ToastContainer />
//             {message.sender === "user" && (
//                 <button className="edit-button-left" onClick={handleEditClick}>
//                     <FaEdit />
//                 </button>
//             )}
//             <div className={`chat-message ${message.sender}`}>
//                 {isEditing && message.sender === "user" ? (
//                     <div>
//                         <textarea
//                             value={editedText}
//                             onChange={(e) => setEditedText(e.target.value)}
//                             className="edit-textarea"
//                         />
//                         <button className="resend-button" onClick={handleResendClick}>
//                             <FaRedo />
//                         </button>
//                     </div>
//                 ) : (
//                     <div>
//                         {message.editedText && message.sender === "user" && (
//                             <div>
//                                 <p>Original: {message.text}</p>
//                                 <p>Edited: {message.editedText}</p>
//                             </div>
//                         )}
//                         {message.sender === "bot" ? renderMarkdown(typedText) : typedText}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ChatMessage;
// components/ChatMessage.js
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaEdit, FaRedo, FaCopy } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { typewriterEffect } from "../utils";

function ChatMessage({ message, onResend, isNewMessage }) { // Add isNewMessage prop
    const [typedText, setTypedText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(message.text);
    const messageRef = useRef(null);
    const hasRun = useRef(false);

    useEffect(() => {
        let intervalId;

        if (message.sender === "bot") {
            setTypedText("");
            hasRun.current = false;

            if (isNewMessage && !hasRun.current) { // Check isNewMessage
                intervalId = typewriterEffect(message.text, setTypedText, 20);
                hasRun.current = true;
            } else {
                setTypedText(message.text); // Display immediately if not a new message
            }
        } else {
            setTypedText(message.text);
        }

        if (messageRef.current) {
            messageRef.current.scrollIntoView({ behavior: "smooth" });
        }

        return () => clearInterval(intervalId);
    }, [message.text, message.sender, isNewMessage]); // Include isNewMessage in dependency array

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
            {message.sender === "user" && (
                <button className="edit-button-left" onClick={handleEditClick}>
                    <FaEdit />
                </button>
            )}
            <div className={`chat-message ${message.sender}`}>
                {isEditing && message.sender === "user" ? (
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
                        {message.editedText && message.sender === "user" && (
                            <div>
                                <p>Original: {message.text}</p>
                                <p>Edited: {message.editedText}</p>
                            </div>
                        )}
                        {message.sender === "bot" ? renderMarkdown(typedText) : typedText}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChatMessage;