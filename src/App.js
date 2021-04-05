import logo from './logo.svg';
import './App.css';
import Diagram from "./components/diagram/diagram";

function App() {
    const fakeValues = [{ percent : 10 , color: "#f00" },{ percent: 30 , color : "#ff0" },{ percent: 60 , color: "#f0f" }]


  return (
    <div className="App">
      <header className="App-header">
        <Diagram values={fakeValues}/>
      </header>
    </div>
  );
}

export default App;
