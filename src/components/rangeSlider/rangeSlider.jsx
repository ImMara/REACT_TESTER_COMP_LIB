import React, {useState , useEffect} from 'react'
import './rangeSlider.scss'

const RangeSlider = (props) => {

    const [lock , setLock] = useState(props.lock)

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

        // console.log("launch")

            chartSelector = document.querySelectorAll(".chartSelector span:first-child")
            coloredBar = document.querySelectorAll(".chartSelector span:nth-child(2)")
            let bar = document.querySelectorAll(".chartSelector")
            let lockers = document.querySelectorAll(".locker")


            document.addEventListener("mousemove", (e) => {
               value = Math.max(
                    0,
                    Math.min(
                        props.max,
                        ((e.clientX - bar[props.index].offsetLeft) / bar[props.index].clientWidth) * 100
                    )
                )
            })

            lockers[props.index].addEventListener("click", (e) => {
                setLock(!lock)
                // console.log(lock)
                // props.locking(props.index,lock)
            })
            bar[props.index].addEventListener("mousedown", (e) => {
                resize()
                e.stopImmediatePropagation()
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

        if(!lock){
            props.change(props.index,parseInt(value))

            coloredBar[props.index].style.left = value + "%";
            coloredBar[props.index].style.width = value + "%";
            chartSelector[props.index].style.left = value + "%";
        }
    };
    const [test , setTest] = useState()


    return(
        <div style={{display:'flex'}}>
            <div className="chartSelector" style={{filter : "drop-shadow("+getColor()+" "+props.color+")"}}>
                <span style={{left:props.percent+'%',backgroundColor: props.color , filter : "drop-shadow("+getColor()+" "+props.color+")"}} />
                <span style={{left:props.percent+'%',width:props.percent+'%',backgroundColor: props.color , filter : "drop-shadow("+getColor()+" "+props.color+")"}} />
            </div>
            <div className="locker">
                {lock === true ?
                    <i className="fal fa-user-lock" style={{ marginLeft:"15px" , color:"#E3242B"}}/>
                        :
                    <i className="fal fa-user-unlock" style={{ marginLeft:"15px" , color:"#b0f2b6"}}/>
                }
            </div>
            <div style={{ width:'100px',  marginLeft:"15px",  whiteSpace:"nowrap"}}> {value} %</div>
        </div>
    )
}
export default RangeSlider;