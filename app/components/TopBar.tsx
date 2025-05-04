'use client';

import { useState, useEffect } from 'react';
import { FaRegClock } from 'react-icons/fa';

export default function TopBar() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  const handleTimerClick = () => {
    setTime(0);
    setIsRunning(!isRunning);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full border-b">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold text-gray-900">
            Distributed LRU Cache
          </h1>
          <button
            onClick={handleTimerClick}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors flex items-center gap-2"
          >
            <FaRegClock className="text-primary-pure" />
            {formatTime(time)}
          </button>
        </div>
      </div>
    </div>
  );
}
