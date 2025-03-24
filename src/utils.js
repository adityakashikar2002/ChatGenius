export function typewriterEffect(text, setTypedText, speed) {
    let index = 0;
    let newText = ""; // Local variable to store progress

    setTypedText(""); // Ensure text is cleared before starting

    const intervalId = setInterval(() => {
        if (index < text.length) {
            newText += text.charAt(index); // Append next character
            setTypedText(newText); // Update state with full progress
            index++;
        } else {
            clearInterval(intervalId);
        }
    }, speed);

    return intervalId;
}
