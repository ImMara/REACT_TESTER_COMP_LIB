import logo from './logo.svg';
import './App.css';
import Diagram from "./components/diagram/diagram";
import RangeSlider from "./components/rangeSlider/rangeSlider";
import {useState, useEffect, useRef, useCallback} from "react";

function App(callback, deps) {
    const fakeValues = [
        {name: "user 0", percent : 20 , color: "#00ff00", lock: true, max:80 },
        {name: "user 1", percent : 20 , color: "#F34F41", lock: false, max:80 },
        {name:"user 2", percent: 20 , color : "#77DD78", lock: false, max:80 },
        {name:"user 3", percent: 20 , color: "#FBFA93", lock: false, max:80 },
        {name:"user 4", percent: 20 , color:"#FEFFF3", lock: false, max:80 }
    ]

    const [values , setValues] = useState(fakeValues)

    const handleLocking = ( index , value ) =>{
        let newValues = [...values]
        values[index].lock = value;
        setValues(newValues)
    }

    const handleChange =( index , value ) => {
        let total = 0
        let reste = 0
        let resteNbre = 0
        let total2 = 0
        values.forEach((v, i) => {
            total += v.percent
            if (i !== index && !v.lock) {
                reste += v.percent
                resteNbre++
            }
        })
        values.forEach((v, i) => {
            if (i !== index && !v.lock) {
                if (reste === 0) v.percent += (100 - (total)) / resteNbre
                else v.percent += (100 - (total)) * (v.percent / reste)
                if (v.percent <= 0) {
                    value +=  v.percent
                    v.percent = 0
                }
            }
            total2 += parseFloat(v.percent)
        })
        console.log(value)
        values[index].percent = value
        setValues([...values])
    }

  return (
    <div className="App">
      <header className="App-header">
        <Diagram
            height={400}
            textColor={"#fff"}
            // required array of object with name , percent , color for each diag
            values={values}
            ecart={"0"}
            title={""}
            effect={""}
            // empty string or remove effect for normal mode , neon
        >
        </Diagram>
        <div>
            { values.map((v,key) =>(
                <RangeSlider
                    key={key}
                    effect={''}
                    index={key}
                    color={v.color}
                    max={v.max}
                    lock={v.lock}
                    percent={v.percent}
                    change={handleChange}
                    locking={handleLocking}
                />
            )) }
        </div>
      </header>
    </div>
  );
}

export default App;
