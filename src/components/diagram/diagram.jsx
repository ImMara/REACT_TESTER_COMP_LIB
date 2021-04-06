import React, {useState} from 'react';
import './diagram.scss';
import {useEffect} from 'react';

const Diagram = (props) => {

    const getColor = () => {
        const value = props.effect
        switch (value) {
            case "neon" : return "0px 0px 2px"
            case "none" : return "0px 0px 0px"
            default : return "0px 0px 5px"
        }
    }

    useEffect(()=>{
        document.querySelectorAll(".chartCircle").forEach((chart)=>{
            chart.setAttribute('viewBox',"0 0 100 100")

            let step = 0
            let ecart = props.ecart ? props.ecart : 0

            chart.querySelectorAll("circle").forEach((circle)=>{
                const p = parseFloat(circle.getAttribute('percent'))
                const r = parseFloat(getComputedStyle(circle).getPropertyValue('r'))
                const dash = Math.PI*r*2
                circle.style.strokeDasharray = dash - ecart
                circle.style.strokeDashoffset = dash - (p-ecart) * dash / 100
                circle.style.transform = "rotate("+((step)*3.6-90)+"deg)"
                step+=p

                circle.addEventListener('mouseover', (e) =>{
                    const target = e.target
                    const percent = target.getAttribute('percent')
                    const name = target.getAttribute('name')
                    const color = target.getAttribute('stroke')
                    setSelectedPercent(percent)
                    setSelectedName(name)
                    setSelectedColor(color)
                })

            })
        })
    },[])

    const [selectedPercent,setSelectedPercent] = useState();
    const [selectedName , setSelectedName ] = useState();
    const [selectedColor, setSelectedColor ] = useState();

    return(
        <>
            <svg
                className="chartCircle"
                style={{height:props.height+"px"}}>
              { props.values.map( values => (
                <circle
                    percent={ values.percent }
                    name={ values.name }
                    stroke={ values.color }
                    style={{ filter : "drop-shadow("+getColor()+" "+values.color+")"}}
                />
              ))}
                <text
                    x="50%" y="51%"
                    dominantBaseline="middle"
                    stroke={props.textColor}
                    fill={props.textColor}
                    textAnchor="middle">{ props.title }
                </text>
                <text
                    x="50%" y="45%"
                    dominantBaseline="middle"
                    stroke={setSelectedColor}
                    fill={selectedColor}
                    textAnchor="middle">{ selectedPercent }%
                </text>
                <text
                    x="50%"
                    y="60%"
                    dominantBaseline="middle"
                    stroke={props.textColor}
                    fill={props.textColor}
                    textAnchor="middle">{ selectedName }
                </text>
            </svg>
        </>
    )
}

export default Diagram;