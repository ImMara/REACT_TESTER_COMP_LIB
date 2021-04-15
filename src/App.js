import logo from './logo.svg';
import './App.css';
import Diagram from "./components/diagram/diagram";
import RangeSlider from "./components/rangeSlider/rangeSlider";
import {useState, useEffect, useRef, useCallback} from "react";

function App(callback, deps) {
    // const fakeValues = [
    //     {name: "user 0", percent : 20 , color: "#00ff00", lock: true, max:80 },
    //     {name: "user 1", percent : 20 , color: "#F34F41", lock: false, max:80 },
    //     {name:"user 2", percent: 20 , color : "#77DD78", lock: false, max:80 },
    //     {name:"user 3", percent: 20 , color: "#FBFA93", lock: false, max:80 },
    //     {name:"user 4", percent: 20 , color:"#FEFFF3", lock: false, max:80 }
    // ]

    const fakeValues = [
        {name: "user 0", percent : 150 , color: "#00ff00", lock: true, max:80 },
        {name: "user 1", percent : 20 , color: "#F34F41", lock: false, max:80 },
        {name:"user 2", percent: 200 , color : "#77DD78", lock: false, max:80 },
        {name:"user 3", percent: 80 , color: "#FBFA93", lock: false, max:80 },
        {name:"user 4", percent: 50, color:"#FEFFF3", lock: false, max:80 }
    ]

    const [values , setValues] = useState(fakeValues)

    let handleLock;
    handleLock = ( index , value ) =>{
        let newValues = [...values]
        newValues[index].lock = value;
        let total = 0;
        newValues.filter(v=> v.lock === true ).map( val => total += val.percent)
        total = 100 - total
        newValues.forEach(v => v.max = total)
        setValues(newValues)
    }

    // let handleChange;
    // handleChange = useCallback((index, value) => {
    //     let total = 0
    //     let reste = 0
    //     let resteNbre = 0
    //     let total2 = 0
    //     values.forEach((v, i) => {
    //         total += v.percent
    //         if (i !== index && !v.lock) {
    //             reste += v.percent
    //             resteNbre++
    //         }
    //     })
    //     values.forEach((v, i) => {
    //         if (i !== index && !v.lock) {
    //             if (reste === 0) v.percent += Math.round((100 - (total)) / resteNbre)
    //             else v.percent += Math.round((100 - (total)) * (v.percent / reste))
    //             if (v.percent <= 0) {
    //                 value += v.percent
    //                 v.percent = 0
    //             }
    //         }
    //         total2 += v.percent
    //         console.log(resteNbre)
    //     })
    //     //console.log(value)
    //     const newValues = [...values]
    //     newValues[index].percent=value
    //     setValues(newValues)
    // },[values]);

    let handleChange;
    handleChange = useCallback((index,value) =>{

    },[values])

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
                    locking={handleLock}
                />
            )) }
        </div>
      </header>
    </div>
  );
}

export default App;
