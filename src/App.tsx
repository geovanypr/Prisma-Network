import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>React + TypeScript</h1>
      <p>Bienvenido a tu proyecto React con TypeScript.</p>
      <div className="counter">
        <button onClick={() => setCount((value) => value - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount((value) => value + 1)}>+</button>
      </div>
    </div>
  );
}

export default App;
