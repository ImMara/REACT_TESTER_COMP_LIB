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

    useEffect(() => {

            let chartSelector = document.querySelectorAll(".chartSelector span:first-child");
            let coloredBar = document.querySelectorAll(".chartSelector span:nth-child(2)");
            let bar = document.querySelectorAll(".chartSelector");

            let values = props.percent;

            document.addEventListener("mousemove", (e) => {
               values = parseInt(Math.max(
                    0,
                    Math.min(100, ((e.clientX - bar[props.index].offsetLeft) / bar[props.index].clientWidth) * 100)
                ));
            });

            bar[props.index].addEventListener("mousedown", (e) => {
                document.addEventListener("mousemove", resize);
            });

            bar[props.index].addEventListener("touchmove", (e) => {
                values = parseInt(Math.max(
                    0,
                    Math.min(
                        100,
                        ((e.targetTouches[0].clientX - bar[props.index].offsetLeft) / bar[props.index].clientWidth) * 100
                    )
                ));
                resize();
             });

            document.addEventListener("mouseup", (e) => {
                document.removeEventListener("mousemove", resize);
            });

            const resize = () => {
                coloredBar[props.index].style.left = values+ "%";
                coloredBar[props.index].style.width = values + "%";
                chartSelector[props.index].style.left = values + "%";
                setTest(values)
            };
    })
    const [test , setTest] = useState()

    props.change(props.index,test)

    return(
        <div className="chartSelector" style={{filter : "drop-shadow("+getColor()+" "+props.color+")"}}>
            <span style={{left:props.percent+'%',backgroundColor: props.color , filter : "drop-shadow("+getColor()+" "+props.color+")"}} />
            <span style={{left:props.percent+'%',width:props.percent+'%',backgroundColor: props.color , filter : "drop-shadow("+getColor()+" "+props.color+")"}} />
        </div>
    )
}
export default RangeSlider;