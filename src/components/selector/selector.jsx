import React, {useEffect, useRef} from "react";
import './selector.scss';

const Selector = (props) => {

    const select = useRef(null)
    const input = useRef(null)
    const icon = useRef(null)
    const drop = useRef(null)



    useEffect(() => {

        const triggerEvent = (el, type) => {
            if ("createEvent" in document) {
                let e = document.createEvent("HTMLEvents");
                e.initEvent(type, false, true);
                el.dispatchEvent(e);
            } else {
                let e = document.createEventObject();
                e.eventType = type;
                el.fireEvent("on" + e.eventType, e);
            }
        };

        select.current.onclick = () => {
            drop.current.classList.toggle("d-block");
            select.current.firstElementChild.classList.toggle("r-180");
            select.current.firstElementChild.classList.toggle("r-180-none");
            console.log(select.current.firstElementChild)
        };

        drop.current.querySelectorAll("span").forEach(
            (s) =>
                s.onclick = () => {

                    let opt = input.current.querySelector("option");
                    opt.setAttribute("value", s.getAttribute("data"));
                    opt.innerHTML = s.innerText;

                    drop.current.classList.toggle("d-block");
                    select.current.innerHTML = s.innerText + '<i class="fas fa-chevron-down r-180-none"></i>';
                    //triggerEvent(input, "change");
                }
        );
    },[drop])

    return (
        <div>
            <div className={"custom-select"}>
                <select name="" id="" ref={input}>
                    <option value="">test</option>
                </select>
                <div className="selected" ref={select}>
                    message
                    <i className="fas fa-chevron-down r-180-none" ref={icon}></i>
                </div>
                <div className={"drop"} ref={drop}>
                    <span data={"test"}>test</span>
                    <span data={"test2"}>test 2</span>
                </div>
            </div>
        </div>
    )
}

export default Selector;