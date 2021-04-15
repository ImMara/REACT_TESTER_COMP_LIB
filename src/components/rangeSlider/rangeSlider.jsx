import React, {useState, useEffect, useRef, useCallback, useLayoutEffect, useContext} from 'react'
import './rangeSlider.scss'

const RangeSlider = (props) => {

    const myBar = useRef(null)

    const [value , setValue] = useState(props.percent)
    let x
    let clicked = false
    let maxPercent = 100
    let minPercent = 0

    useEffect(()=>{

        const handleMoves = (e) =>{
            x = e.clientX
            if(clicked) {
                percentCalc()
            }
        }
        const switcher = () =>{
            clicked = false
        }
        const percentCalc = () =>{
            const temp = parseInt(Math.max(minPercent, Math.min(maxPercent, ((x - myBar.current.offsetLeft) / myBar.current.clientWidth) * 100)))
            setValue(temp)
            props.change(temp)
        }
        myBar.current.onmousedown = function (){
            percentCalc()
            clicked=true
        }
        window.addEventListener("mouseup", switcher);
        window.addEventListener("mousemove",handleMoves);
        return () => {
            window.removeEventListener('mouseup',switcher);
            window.removeEventListener('mousemove',handleMoves);
        }
    },[clicked])

    // props.change(value)

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
            >
                <span
                    style={{
                        left: value + '%',
                        backgroundColor: props.color,
                    }}
                />
                <span
                    style={{
                        left: value + '%',
                        width: value + '%',
                        backgroundColor: props.color,
                    }}
                />
            </div>
            <div style={{width: '100px', marginLeft: "15px", whiteSpace: "nowrap"}}> {value} %</div>
        </div>
    )
}
export default RangeSlider;