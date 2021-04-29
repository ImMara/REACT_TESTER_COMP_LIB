import React, {useEffect, useRef, useState} from 'react';
import './diagram.scss';

const Diagram = (props) => {

    let total = 0
    props.values.map(value => {
        total += value.percent
    })
    // console.log(total)
    const myChart = useRef(null)

    useEffect(() => {
        const chart = myChart.current

        chart.setAttribute('viewBox', "0 0 100 100")

        let step = 0
        let ecart = props.ecart ? props.ecart : 0

        chart.querySelectorAll("circle").forEach((circle) => {
            const p = parseFloat(circle.getAttribute('percent') * 100 / total)
            const r = parseFloat(getComputedStyle(circle).getPropertyValue('r'))
            const dash = Math.PI * r * 2
            circle.style.strokeDasharray = dash - ecart
            circle.style.strokeDashoffset = dash - (p - ecart) * dash / 100
            circle.style.transform = "rotate(" + ((step) * 3.6 - 90) + "deg)"
            step += p
            circle.addEventListener('mouseover', (e) => {
                const target = e.target
                const percent = target.getAttribute('percent')
                const name = target.getAttribute('name')
                const color = target.getAttribute('stroke')
                setSelectedPercent(percent)
                setSelectedName(name)
                setSelectedColor(color)
            })
        })
    }, [props.values])

    const [selectedPercent, setSelectedPercent] = useState()
    const [selectedName, setSelectedName] = useState()
    const [selectedColor, setSelectedColor] = useState()

    return (
        <>
            <svg
                className="chartCircle"
                ref={myChart}
                style={{height: props.height + "px"}}>
                {props.values.map(values => (
                    values.percent !== 0 ? (
                        <circle
                            percent={values.percent}
                            name={values.name}
                            stroke={values.color}
                        />
                    ) : null))}
                <text
                    x="50%" y="51%"
                    dominantBaseline="middle"
                    stroke={props.textColor}
                    fill={props.textColor}
                    textAnchor="middle"
                >{props.title}

                </text>
                <text
                    x="50%" y="45%"
                    dominantBaseline="middle"
                    stroke={setSelectedColor}
                    fill={selectedColor}
                    textAnchor="middle">{(selectedPercent / total * 100).toFixed(1)}%
                </text>
                <text
                    x="50%"
                    y="60%"
                    dominantBaseline="middle"
                    stroke={props.textColor}
                    fill={props.textColor}
                    textAnchor="middle">{selectedName}
                </text>
            </svg>

        </>
    )
}

export default Diagram;