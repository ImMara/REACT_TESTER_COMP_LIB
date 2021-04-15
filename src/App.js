import './App.css';
import Diagram from "./components/diagram/diagram";
import RangeSlider from "./components/rangeSlider/rangeSlider";
import {useCallback, useState} from "react";

function App(callback, deps) {

    const fakeValues = [
        {name: "user 0", percent: 80, color: "#00ff00", lock: true, max: 80},
        {name: "user 1", percent: 20, color: "#F34F41", lock: false, max: 80},
        {name: "user 2", percent: 100, color: "#77DD78", lock: false, max: 80},
        {name: "user 3", percent: 80, color: "#FBFA93", lock: false, max: 80},
        {name: "user 4", percent: 50, color: "#FEFFF3", lock: false, max: 80}
    ]

    const [values, setValues] = useState(fakeValues)

    let handleChange;
    handleChange = useCallback((index, value) => {
        // console.log(index,value)
        let newValues = [...values]
        newValues[index].percent = value;
        setValues(newValues)
    }, [values])

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
                    // empty string or remove effect for normal mode , neon
                >
                </Diagram>
                <div>
                    {values.map((v, key) => (
                        <RangeSlider
                            key={key}
                            color={v.color}
                            percent={v.percent}
                            change={(value) => handleChange(key, value)}
                        />
                    ))}
                </div>
            </header>
        </div>
    );
}

export default App;
