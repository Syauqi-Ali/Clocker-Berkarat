import React, { useState, useEffect } from 'react';

const NumberIncrease = ({ target: targetNumber, duration = 500 }) => {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
        const startTime = performance.now();
        const updateNumber = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const increment = (targetNumber * elapsedTime) / duration;
            const nextNumber = Math.min(increment, targetNumber);

            setCurrentNumber(nextNumber);

            if (nextNumber < targetNumber) {
                requestAnimationFrame(updateNumber);
            }
        };

        requestAnimationFrame(updateNumber);

        return () => setCurrentNumber(targetNumber);
    }, [targetNumber, duration]);

    return <span>{Math.floor(currentNumber)}</span>;
};

export default NumberIncrease;
