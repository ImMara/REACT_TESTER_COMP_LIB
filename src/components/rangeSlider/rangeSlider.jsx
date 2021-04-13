import React, {useState, useEffect, useRef, useCallback, useLayoutEffect, useContext} from 'react'
import './rangeSlider.scss'

const RangeSlider = (props) => {

    const [lock, setLock] = useState(props.lock)

    const getColor = () => {
        const color = props.effect
        switch (color) {
            case "neon" :
                return "0px 0px 2px"
            default :
                return "0px 0px 0px"
        }
    }

    const myBar = useRef(null)

    let value = props.percent ;
    let x;
    let bool = false;
    let maxPercent= 100;
    let mathMin = 0;

    useEffect(()=>{
        const handleMoves = (e) =>{
            x = e.clientX
            if(bool) {
                percentCalc()
            }
        }
        const switcher = () =>{
            bool = false;
        }
        const percentCalc = () =>{
           value = Math.max(mathMin, Math.min(props.max, ((x - myBar.current.offsetLeft) / myBar.current.clientWidth) * maxPercent))
            if (!lock) {
              props.change(props.index, parseFloat(value))
            }
        }
        myBar.current.onmousedown = function (){
            percentCalc()
            bool=true;
            if(!lock){
                props.change(props.index, parseFloat(value))
            }
        }
        window.addEventListener("mouseup", switcher);
        window.addEventListener("mousemove",handleMoves);
        return () => {
            window.removeEventListener('mouseup',switcher);
            window.removeEventListener('mousemove',handleMoves);
        }
    },[bool])

    //MOBILE A FAIRE
    // const handleChartTouch = (e) =>{
    //     value = Math.max(
    //         0,
    //         Math.min(
    //             100,
    //             ((e.targetTouches[0].clientX - e.target.offsetLeft) / e.target.clientWidth) * 100
    //         )
    //     )
    //     resize()
    // }

    return (
        <div style={{display: 'flex'}} className={"test"}>
            <div
                ref={myBar}
                className="chartSelector"
                style={{filter: "drop-shadow(" + getColor() + " " + props.color + ")"}}
            >
                <span
                    style={{
                        left: props.percent + '%',
                        backgroundColor: props.color,
                        filter: "drop-shadow(" + getColor() + " " + props.color + ")"
                    }}
                />
                <span
                    style={{
                        left: props.percent + '%',
                        width: props.percent+1 + '%',
                        backgroundColor: props.color,
                        filter: "drop-shadow(" + getColor() + " " + props.color + ")",
                    }}
                />
            </div>
            <div className="locker">
                {lock === true ?
                    <i className="fal fa-user-lock" style={{marginLeft: "15px", color: "#E3242B"}}/>
                    :
                    <i className="fal fa-user-unlock" style={{marginLeft: "15px", color: "#b0f2b6"}}/>
                }
            </div>
            <div style={{width: '100px', marginLeft: "15px", whiteSpace: "nowrap"}}> {props.percent.toFixed(2)} %</div>
        </div>
    )
}
export default RangeSlider;