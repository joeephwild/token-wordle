//init game play
//start timer
//monitor words
//on enter check words and return green indexes/orange ones
//if all green , end game
// count trials , 5 max
import React, { useState, useEffect } from "react";

const GameplayContext = React.createContext({
  isStarted: false,
  initGame: () => {},
  timerState: { seconds: 0, minutes: 0 },
  wordState: [],
  updateWordState: (letter) => {},
});

export const GameplayContextProvider = (props) => {
  const [isStarted, setIsStarted] = useState(false);
  const [time, setTime] = useState(300);
  const [timerState, setTimerState] = useState({ minutes: 0, seconds: 0 });

  const startTimer = () => {
    let timeC = 300;
    const interval = setInterval(() => {
      if (timeC > 0) {
        setTime((prevTime) => prevTime - 1);
        timeC -= 1;
      } else {
        return;
      }
      console.log(timeC);
    }, 1000);

    return () => clearInterval(interval); // Clear the interval when game ends or component unmounts
  };
  const initGame = () => {
    setIsStarted(true);
    startTimer();
  };
  // return () => clearInterval(interval);
  //   };
  //   const loginHandler = (email, password) => {
  //     // We should of course check email and password
  //     // But it's just a dummy/ demo anyways
  //     localStorage.setItem("isLoggedIn", "1");
  //     setIsLoggedIn(true);
  //   };
  useEffect(() => {
    setTimerState({ minutes: Math.floor(time / 60), seconds: time % 60 });
    console.log(timerState);
  }, [time]);

  return (
    <GameplayContext.Provider
      value={{
        isStarted: isStarted,
        initGame: initGame,
        timerState: timerState,
        // wordState: wordState,
      }}
    >
      {props.children}
    </GameplayContext.Provider>
  );
};
export default GameplayContext;
