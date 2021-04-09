import React, {useState , useEffect} from 'react';
import './rangeSlider.scss';

const RangeSlider = (props) => {

    const getColor = () => {
        const value = props.effect
        switch (value) {
            case "neon" : return "0px 0px 2px"
            default : return "0px 0px 0px"
        }
    }
    let values = props.percent;
    let chartSelector;
    let coloredBar;

    useEffect(() => {

            chartSelector = document.querySelectorAll(".chartSelector span:first-child");
            coloredBar = document.querySelectorAll(".chartSelector span:nth-child(2)");
            let bar = document.querySelectorAll(".chartSelector");


            document.addEventListener("mousemove", (e) => {
               values = Math.max(
                    0,
                    Math.min(100, ((e.clientX - bar[props.index].offsetLeft) / bar[props.index].clientWidth) * 100)
                );
            });

            bar[props.index].addEventListener("mousedown", (e) => {
                e.stopImmediatePropagation()
                resize()
                document.addEventListener("mousemove", resize);
            });

            bar[props.index].addEventListener("touchmove", (e) => {
                values = Math.max(
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

        props.change(props.index,parseInt(values))

        coloredBar[props.index].style.left = values+ "%";
        coloredBar[props.index].style.width = values + "%";
        chartSelector[props.index].style.left = values + "%";
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