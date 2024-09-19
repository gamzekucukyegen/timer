"use client";
import React, { useState, useEffect } from "react";

const App = () => {
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [active, setActive] = useState(false);
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(false); 

  const startTime = () => {
    const initialSeconds = parseInt(minute) * 60 + parseInt(second);
    setTime(initialSeconds); 
    setActive(true); 
    setCount(false); 
  };

  useEffect(() => {
    let interval = null;
    if (active) {
      interval = setInterval(() => {
        setTime((prev) =>
          count ? prev - 1 : prev + 1 
        );
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [active, count]);

  const pause = () => {
    setActive(false); 
  };

  const resume = () => {
    setActive(true); 
    setCount(true); 
  };
  const reset = () => {
    setActive(false);
    setCount(false);
    setTime(parseInt(minute) * 60 + parseInt(second)); 
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "20px",
      fontFamily: "Arial, sans-serif",
    },
    inputContainer: {
      display: "flex",
      gap: "10px",
    },
    label: {
      fontSize: "18px",
      fontWeight: "bold",
    },
    input: {
      padding: "5px",
      fontSize: "16px",
      marginLeft: "10px",
    },
    buttonContainer: {
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    timer: {
      fontSize: "36px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          Dakika Giriniz:
          <input
            value={minute}
            type="number"
            min="0"
            onChange={(e) => setMinute(e.target.value)}
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Saniye Giriniz:
          <input
            value={second}
            type="number"
            min="0"
            max="59"
            onChange={(e) => setSecond(e.target.value)}
            style={styles.input}
          />
        </label>
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={startTime} style={styles.button}>START</button>
        <button onClick={pause} style={styles.button}>PAUSE</button>
        <button onClick={resume} style={styles.button}>RESUME</button>
        <button onClick={reset} style={styles.button}>RESET</button>
      </div>
      <h2 style={styles.timer}>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </h2>
    </div>
  );
};

export default App;
