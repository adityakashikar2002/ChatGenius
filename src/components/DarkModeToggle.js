// chat-app/src/components/DarkModeToggle.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../redux/actions';

function DarkModeToggle() {
    const isDarkMode = useSelector((state) => state.isDarkMode);
    const dispatch = useDispatch();

    const handleToggle = () => {
        dispatch(toggleDarkMode());
        document.body.classList.toggle('dark-mode');
    };

    return (
        <button className="dark-mode-toggle" onClick={handleToggle}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
}

export default DarkModeToggle;