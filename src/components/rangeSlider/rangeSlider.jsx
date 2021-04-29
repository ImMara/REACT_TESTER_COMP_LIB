import React, {useState, useEffect, useRef, useCallback, useLayoutEffect, useContext} from 'react'
import './rangeSlider.scss'

const RangeSlider = (props) => {

    const myBar = useRef(null)

    const [value, setValue] = useState(props.percent)
    let x
    let clicked = false
    let maxPercent = 100
    let minPercent = 0

    useEffect(() => {

        const handleMoves = (e) => {
            x = e.clientX
            if (clicked) {
                percentCalc()
            }
        }
        const switcher = () => {
            clicked = false
        }
        const percentCalc = () => {
            const temp = parseInt(Math.max(minPercent, Math.min(maxPercent, ((x - myBar.current.offsetLeft) / myBar.current.clientWidth) * 100)))
            setValue(temp)
            props.change(temp)
        }
        myBar.current.onmousedown = function () {
            percentCalc()
            clicked = true
        }
        myBar.current.ontouchmove = function () {
            percentCalc()
        }
        window.addEventListener("mouseup", switcher);
        window.addEventListener("mousemove", handleMoves);
        return () => {
            window.removeEventListener('mouseup', switcher);
            window.removeEventListener('mousemove', handleMoves);
        }
    }, [clicked])

    return (
        <div style={{display: 'flex'}}>
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