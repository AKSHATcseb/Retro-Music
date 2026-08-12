import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Format hours: 12-hour clock
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' -> '12'
    const hoursStr = hours.toString().padStart(2, '0');
    
    return `${hoursStr}:${minutes} ${ampm}`;
  };

  return (
    <div className="absolute top-6 right-8 z-30 font-mono text-[11px] tracking-[0.25em] text-retro-cream/60 select-none drop-shadow-md">
      {formatTime(time)}
    </div>
  );
}
