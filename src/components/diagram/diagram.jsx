import React, {useState} from 'react';
import './diagram.scss';
import {useEffect} from 'react';

const Diagram = (props) => {

    useEffect(()=>{
        document.querySelectorAll(".chartCircle").forEach((chart)=>{
            chart.setAttribute('viewBox',"0 0 100 100")
            let step = 0
            chart.querySelectorAll("circle").forEach((circle)=>{
                const p = parseFloat(circle.getAttribute('percent'))
                const r = parseFloat(getComputedStyle(circle).getPropertyValue('r'))
                const dash = Math.PI*r*2
                circle.style.strokeDasharray = dash
                circle.style.strokeDashoffset = dash - p * dash / 100
                circle.style.transform = "rotate("+(step*3.6-90)+"deg)"
                step+=p
            })
        })
    },[])

    const [selectedPercent,setSelectedPercent] = useState();

    const percentSelected = (values) =>{
        setSelectedPercent(values);
    }

    return(
        <>
            <svg className="chartCircle" percentSelector={selectedPercent}>
                { props.values.map( values => (
                    <circle percent={values.percent} stroke={values.color} onMouseEnter={percentSelected(values.percent)}>
                    </circle>
                )) }
            </svg>
        </>
    )
}

export default Diagram;