import { useState } from "react";

export default function App3() {
    const [counter, setCounter] = useState(0);
  
    if (counter === 3) {
      throw new Error("Oops, You triggered Doomsday!");
    }
  
    const countUntilDoom = () => {
      setCounter(counter + 1);
    };
  
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <button onClick={countUntilDoom}>Click on me for money</button>
        <h2>{counter}</h2>
      </div>
    );
  }