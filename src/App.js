import logo from './logo.svg';
import './App.css';
import Diagram from "./components/diagram/diagram";
import RangeSlider from "./components/rangeSlider/rangeSlider";
import {useState} from "react";

function App() {
    const fakeValues = [
        {name: "user 1", percent : 10 , color: "#F34F41" },
        {name:"user 2", percent: 30 , color : "#77DD78" },
        {name:"user 3", percent: 33 , color: "#FBFA93" },
        {name:"user 4", percent: 27 , color:"#FEFFF3" }
    ]
    const [values , setValues]   = useState(fakeValues)
    const handleChange = ( index , value ) =>{
        values[index].percent = value;
    }


  return (
    <div className="App">
      <header className="App-header">
          <h1>{values[1].percent}</h1>
        <Diagram
            height={400}
            textColor={"#fff"}
            // required array of object with name , percent , color for each diag
            values={values}
            ecart={"0.5"}
            title={""}
            effect={"neon"}
            // empty string or remove effect for normal mode , neon
            />
            <div>
                { values.map((v,key) =>(
                    <>
                        <RangeSlider
                            key={key}
                            effect={'neon'}
                            index={key}
                            color={v.color}
                            percent={v.percent}
                            change={handleChange}
                        />
                    </>
                )) }
            </div>
      </header>
    </div>
  );
}

export default App;
