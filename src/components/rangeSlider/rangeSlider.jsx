import React, {useState, useEffect} from 'react'
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
    let value = props.percent
    let chartSelector
    let coloredBar
    let bar;

    chartSelector = document.querySelectorAll(".chartSelector span:first-child")
    coloredBar = document.querySelectorAll(".chartSelector span:nth-child(2)")



    const [clickDown, setClickDown] = useState(false)

    useEffect(() =>{
        bar = document.querySelectorAll(".chartSelector")
        console.log(bar[props.index].offsetLeft)
        document.addEventListener("mousemove", (e) => {
            value = Math.max(
                0,
                Math.min(
                    props.max,
                    ((e.clientX - bar[props.index].offsetLeft) / bar[props.index].clientWidth) * 100

                )
            )
        })
    })

    let x ;

    document.addEventListener("mousemove",(e)=>{
        x = e.clientX
    })

    const handleChartDown = (e) => {
        const target = e.target
        setClickDown(true)
        resize()
        document.addEventListener("mousemove", resize)
    }

    document.addEventListener("mouseup", (e) => {
        setClickDown(false)
        document.removeEventListener("mousemove", resize, false);
    });

    const resize = () => {
        if (!lock) {
            props.change(props.index, parseInt(value))
        }
    };

    const handleChartTouch = (e) =>{
        value = Math.max(
        0,
        Math.min(
      100,
        ((e.targetTouches[0].clientX - e.target.offsetLeft) / e.target.clientWidth) * 100
    ));
    resize();
    }

    const [test, setTest] = useState()


    return (
        <div style={{display: 'flex'}}>
            <div
                onMouseDown={handleChartDown}
                onTouchMove={handleChartTouch}
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
            <div style={{width: '100px', marginLeft: "15px", whiteSpace: "nowrap"}}> {value} %</div>
        </div>
    )
}
export default RangeSlider;