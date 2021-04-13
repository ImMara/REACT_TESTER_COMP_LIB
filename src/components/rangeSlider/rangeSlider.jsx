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
    let bol = false;

    useEffect(()=>{
        const handlemoves = (e) =>{
            x = e.clientX
            if(bol) {
                calculus()
            }
        }
        const switcher = () =>{
            bol = false;
        }
        const calculus = () =>{
           value = Math.max(0, Math.min(props.max, ((x - myBar.current.offsetLeft) / myBar.current.clientWidth) * 100))
            if (!lock) {
              props.change(props.index, parseFloat(value))
            }
        }
        myBar.current.onmousedown = function (){
            calculus()
            bol=true;
            if(!lock){
                props.change(props.index, parseFloat(value))
            }
        }
        console.log()
        window.addEventListener("mouseup", switcher);
        window.addEventListener("mousemove",handlemoves);
        return () => {
            window.removeEventListener('mouseup',switcher);
            window.removeEventListener('mousemove',handlemoves);
        }
    },[bol])

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
                        width: props.percent + '%',
                        backgroundColor: props.color,
                        filter: "drop-shadow(" + getColor() + " " + props.color + ")"
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