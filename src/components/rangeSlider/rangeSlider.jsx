import React, {useState, useEffect, useRef, useCallback} from 'react'
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

    const [clickDown, setClickDown] = useState(false)

    let x ;
    let target;

    const resize = () => {
        if (!lock) {
            props.change(props.index, Math.round(value))
        }
    };

    document.addEventListener("mouseup", (e) => {
        setClickDown(false)
        document.removeEventListener("mousemove", resize, false);
    });
    useEffect(()=>{
        const handlemoves = (e) =>{
            x = e.clientX
            let bar = document.querySelector('.chartSelector')
            value = Math.max( 0, Math.min( props.max, ( (x - bar.offsetLeft) / bar.clientWidth )*100))
            console.log(value)
        }
        document.addEventListener("mousemove",handlemoves)
        // return () =>{document.removeEventListener('mousemove',handlemoves)}
    },)



    const handleChartDown = (e) => {
        target = e.target
        resize()
        document.addEventListener("mousemove",resize )
        return ()=> document.removeEventListener('mousemove',resize)
    }

   // document.addEventListener("mouseup", (e) => {
   //     setClickDown(false)
   //     document.removeEventListener("mousemove", resize, false);
    //});

    const handleChartTouch = (e) =>{
        value = Math.max(
            0,
            Math.min(
                100,
                ((e.targetTouches[0].clientX - e.target.offsetLeft) / e.target.clientWidth) * 100
            )
        )
        resize()
    }

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