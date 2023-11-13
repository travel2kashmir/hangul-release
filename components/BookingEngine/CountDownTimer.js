import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ minutes, onTimerComplete }) => {
    const [seconds, setSeconds] = useState(minutes * 60);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => {
                    if (prevSeconds > 0) {
                        return prevSeconds - 1;
                    } else {
                        clearInterval(timer);
                        onTimerComplete();
                        return 0;
                    }
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const minutesDisplay = Math.floor(seconds / 60);
    const secondsDisplay = seconds % 60;

    return (
        <div>
            <p> Time Left: {minutesDisplay}:{secondsDisplay < 10 ? '0' : ''}{secondsDisplay}</p>
        </div>
    );
};

export default CountdownTimer;
