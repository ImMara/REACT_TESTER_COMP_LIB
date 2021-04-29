import React, {useEffect, useRef, useState} from "react";
import OutsideClickHandler from 'react-outside-click-handler'
import './selector.scss';

const Selector = (props) => {

    const [focus,changeFocus] = useState(false)

    return (
        <div>
            <div className={focus? "selector focus":"selector"} tabindex="0" onFocus={()=>changeFocus(true)} onBlur={()=>changeFocus(false)} onClick={()=>changeFocus(!focus)}>
                <div className="value">{props.value}</div>
                <div className="arrow"><i className="fas fa-chevron-down"></i></div>
                <OutsideClickHandler onOutsideClick={() => changeFocus(false)} >
                    <div className="droplist">
                        {props.options.map(option=>(<span data={option.value} onClick={()=>props.change(option.value)} className={(option.value==props.value)? "active":""}>{option.name}</span>))}
                    </div>
                </OutsideClickHandler>
            </div>
        </div>
    )
}

export default Selector;