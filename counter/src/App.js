import React, { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);
  const reset = () => setCount(0);
  const incrementFive = () => setCount(prev => prev + 5);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Count: {count}</h1>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={incrementFive}>Increment 5</button>

      <h1 style={{ marginTop: "40px" }}>Welcome to CHARUSAT!!!</h1>

      <div style={{ marginTop: "20px" }}>
        <div>
          First Name:{" "}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          Last Name:{" "}
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <div>First Name: {firstName}</div>
        <div>Last Name: {lastName}</div>
      </div>
    </div>
  );
}

export default App;
