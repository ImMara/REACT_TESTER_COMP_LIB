import logo from './logo.svg';
import './App.css';
import Diagram from "./components/diagram/diagram";

function App() {
    const fakeValues = [{name: "user1", percent : 10 , color: "#f00" },{name:"user2", percent: 30 , color : "#ff0" },{name:"user3", percent: 60 , color: "#f0f" }]


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
            effect={"none"}
            />
      </header>
    </div>
  );
}

export default App;
