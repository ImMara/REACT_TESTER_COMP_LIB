import logo from './logo.svg';
import './App.css';
import Diagram from "./components/diagram/diagram";
import RangeSlider from "./components/rangeSlider/rangeSlider";
import {useState} from "react";

function App() {
    const fakeValues = [
        {name: "user 0", percent : 94 , color: "#00ff00" },
        {name: "user 1", percent : 2 , color: "#F34F41" },
        {name:"user 2", percent: 1 , color : "#77DD78" },
        {name:"user 3", percent: 2 , color: "#FBFA93" },
        {name:"user 4", percent: 1 , color:"#FEFFF3" }
    ]

    const [values , setValues]   = useState(fakeValues)

    const handleChange = ( index , value ) =>{
        let total = 0
        values.forEach( (v,i) => {
            if( i !== index){
                total += v.percent
            }

        })
        values.forEach((v,i) =>{
            if( i !== index){
                if(total==0) v.percent += (100-(total+value)) / (values.length-1)
                else v.percent += (100-(total+value)) * (v.percent/total)
            }
        })
        values[index].percent = value;
        setValues([...values])
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
            ecart={"0"}
            title={""}
            effect={""}
            // empty string or remove effect for normal mode , neon
            />
            <div>
                { values.map((v,key) =>(
                    <>
                        <RangeSlider
                            key={key}
                            effect={''}
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
