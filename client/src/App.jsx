import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [iseServerRunning, setIseServerRunning] = useState(false);

  useEffect(() => {
    fetch(`/api/ping`)
      .then(res => res.json())
      .then(data => data.message === "Pong")
      .then(isPong => setIseServerRunning(isPong))
      .catch(e => {
        console.log('Server is down');
      });
  }, [iseServerRunning]);

  if (!iseServerRunning) {
    return <>
      <h1>Please start the server.</h1>
    </>
  }

  return (
    <>
      <h1>Welcome</h1>
    </>
  )
}

export default App
