import React from "react";
import "./NavControl.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

const ForwardNav = ({ next, arrowClick }) => (
    <div id="forward" className="nav-arrow right-nav" onClick={() => arrowClick(next)}>
        <MdKeyboardArrowRight size={56}/>
    </div>
);

const BackwardNav = ({ prev, arrowClick }) => (
    <div id="backward" className="nav-arrow left-nav" onClick={() => arrowClick(prev)}>
        <MdKeyboardArrowLeft size={56}/>
    </div>
);

const DownwardNav = () => (
    <div id="downward" className="nav-arrow down-nav">
        <MdKeyboardArrowDown size={56}/>
    </div>
);

const UpwardNav = () => (
    <div id="upward" className="nav-arrow up-nav">
        <MdKeyboardArrowUp size={56}/>
    </div>
);

export { ForwardNav, BackwardNav, DownwardNav, UpwardNav };
