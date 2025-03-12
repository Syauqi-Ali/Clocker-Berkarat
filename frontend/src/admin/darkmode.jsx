import React, { useState, useEffect } from 'react';

const DarkMode = () => {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem('isDark');
        return savedTheme !== null ? JSON.parse(savedTheme) : window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const themeClass = isDark ? 'theme-dark' : 'theme-light';
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add(themeClass);
        localStorage.setItem('isDark', JSON.stringify(isDark));
    }, [isDark]);

    const handleThemeToggle = () => setIsDark(prev => !prev);

    return (
        <input
            className="form-check-input me-0"
            type="checkbox"
            id="toggle-dark"
            checked={isDark}
            onChange={handleThemeToggle}
        />
    );
};

export default DarkMode;
