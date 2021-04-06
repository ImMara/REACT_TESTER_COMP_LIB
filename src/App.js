import logo from './logo.svg';
import './App.css';
import Diagram from "./components/diagram/diagram";

function App() {
    const fakeValues = [
        {name: "user 1", percent : 10 , color: "#F34F41" },
        {name:"user 2", percent: 30 , color : "#77DD78" },
        {name:"user 3", percent: 33 , color: "#FBFA93" },
        {name:"user 4", percent: 27 , color:"#FEFFF3" }
    ]


  return (
    <div className="App">
      <header className="App-header">
        <Diagram
            height={400}
            textColor={"#fff"}
            // required array of object with name , percent , color for each diag
            values={fakeValues}
            ecart={0.5}
            title={"test"}
            effect={"neon"}
            // none , neon
            />
      </header>
    </div>
  );
}

export default App;
