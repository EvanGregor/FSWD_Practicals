import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "DEL") {
      setInput((prev) => prev.slice(0, -1));
    } else if (value === "AC") {
      setInput("");
    } else if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    ["AC", "DEL", "", ""],
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"],
  ];

  return (
    <div className="calculator-container">
      <h1>Calculator</h1>
      <div className="calculator">
        <div className="display">{input || "0"}</div>
        <div className="button-grid">
          {buttons.map((row, rowIndex) => (
            <div key={rowIndex} className="button-row">
              {row.map((btn, index) =>
                btn ? (
                  <button
                    key={index}
                    className={`btn ${
                      btn === "AC"
                        ? "btn-ac"
                        : btn === "DEL"
                        ? "btn-del"
                        : btn === "="
                        ? "btn-equals"
                        : ["/", "*", "-", "+"].includes(btn)
                        ? "btn-op"
                        : ""
                    }`}
                    onClick={() => handleClick(btn)}
                  >
                    {btn}
                  </button>
                ) : (
                  <div key={index} className="btn placeholder" />
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
