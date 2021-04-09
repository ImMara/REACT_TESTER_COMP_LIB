import React, {useState , useEffect} from 'react'
import './rangeSlider.scss'

const RangeSlider = (props) => {

    const getColor = () => {
        const color = props.effect
        switch (color) {
            case "neon" : return "0px 0px 2px"
            default : return "0px 0px 0px"
        }
    }
    let value = props.percent
    let chartSelector
    let coloredBar

    useEffect(() => {

            chartSelector = document.querySelectorAll(".chartSelector span:first-child")
            coloredBar = document.querySelectorAll(".chartSelector span:nth-child(2)")
            let bar = document.querySelectorAll(".chartSelector")


            document.addEventListener("mousemove", (e) => {
               value = Math.max(
                    0,
                    Math.min(
                        props.max,
                        ((e.clientX - bar[props.index].offsetLeft) / bar[props.index].clientWidth) * 100
                    )
                )
            })

            bar[props.index].addEventListener("mousedown", (e) => {
                e.stopImmediatePropagation()
                resize()
                document.addEventListener("mousemove", resize)
            })

            bar[props.index].addEventListener("touchmove", (e) => {
                value = Math.max(
                    0,
                    Math.min(
                        100,
                        ((e.targetTouches[0].clientX - bar[props.index].offsetLeft) / bar[props.index].clientWidth) * 100
                    )
                );
                resize();
             });

            document.addEventListener("mouseup", (e) => {
                document.removeEventListener("mousemove", resize,false);
            });
    })

    const resize = () => {

        if(!props.lock){
            props.change(props.index,parseFloat(value))

            coloredBar[props.index].style.left = value + "%";
            coloredBar[props.index].style.width = value + "%";
            chartSelector[props.index].style.left = value + "%";
        }
    };
    const [test , setTest] = useState()


    return(
        <div className="chartSelector" style={{filter : "drop-shadow("+getColor()+" "+props.color+")"}}>
            <span style={{left:props.percent+'%',backgroundColor: props.color , filter : "drop-shadow("+getColor()+" "+props.color+")"}} />
            <span style={{left:props.percent+'%',width:props.percent+'%',backgroundColor: props.color , filter : "drop-shadow("+getColor()+" "+props.color+")"}} />
        </div>
    )
}
export default RangeSlider;