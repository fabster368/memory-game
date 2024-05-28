import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialMinutes = 0, initialSeconds = 0, total, restartGame}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  

  useEffect(() => {
    let timerId;

    if (minutes > 0 || seconds > 0) {
      timerId = setInterval(() => {
      if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    }

    return () => clearInterval(timerId); // Cleanup on component unmount
  }, [minutes, seconds]);

if (minutes === 0 && seconds === 0) {
  return (
    <div className="fixed w-full h-full bg-white/90 flex flex-col justify-center items-center z-20 gap-4">
        <div className="text-center">
            <h1>Time's up!</h1>
            <p>You found {total} pokemons!</p>
            <button
                onClick={restartGame}
                className="bg-[#313167] text-white m-2 p-2 rounded hover:bg-blue-600 focus:outline-none"
            >
                Menu
            </button>
        </div>
    </div>
    
  )
}
  return (
      <h1 className='text-center m-2 p-2 bg-white rounded shadow-sm'>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </h1>
  );
};

export default CountdownTimer;