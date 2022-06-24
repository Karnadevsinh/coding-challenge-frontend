import logo from './logo.svg';
import './App.css';
import FormControl from './components/FormControl';
import { useEffect, useState } from 'react';



function App() {
  const [arr, setArr] = useState([])

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
    .then((response) => response.json())
    .then((data) => setArr(data))
  }, [])
  
  return (
    <div className="App">
      <FormControl data={arr} />
    </div>
  );
}

export default App;
