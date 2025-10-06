import React, { useEffect, useState } from 'react';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); 
  }, []);

  return (
    <div style={styles.container}>
      <h1>Welcome!</h1>
      <p>The current local date and time is:</p>
      <h2>{currentTime.toLocaleString()}</h2>
    </div>
  );
}


const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    marginTop: '50px'
  }
};

export default App;
