import React from "react";
import "./NavControl.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

// animations imports
import Radium from 'radium';
import color from 'color';
import { pulse } from 'react-animations';

class NavControl extends React.Component {

    constructor(props) {
        super(props);
    }

}

class ForwardNav extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.arrowClick(this.props.next);
    };

    render() {
        return (
                <div id="forward" className="right-nav" style={[styles.arrow]} onClick={this.handleClick}>
                    <MdKeyboardArrowRight size={56}/>
                </div>
        );
    }
}

class BackwardNav extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.arrowClick(this.props.prev);
    };

    render() {
        return(
            <div id="backward" className="left-nav" style={styles.arrow} onClick={this.handleClick}>
                <MdKeyboardArrowLeft size={56} />
            </div>
        );
    }
}

class DownwardNav extends React.Component {
    render() {
        return(
            <div id="downward" className="down-nav" style={styles.arrow}>
                <MdKeyboardArrowDown size={56} />
            </div>
        );
    }
}

class UpwardNav extends React.Component {
    render() {
        return(
            <div id="upward" className="up-nav" style={styles.arrow}>
                <MdKeyboardArrowUp size={56} />
            </div>
        );
    }
}

const nasa_blue = '#0b3d91';

let styles = {
    arrow: {
        color: nasa_blue,
        ':hover': {
            color: color(nasa_blue)
                .lighten(0.4),
            animation: 'x 1s infinite',
            animationName: Radium.keyframes(pulse, 'pulse')
        }
    },
};

ForwardNav = Radium(ForwardNav);
BackwardNav = Radium(BackwardNav);
DownwardNav = Radium(DownwardNav);
UpwardNav = Radium(UpwardNav);
export {ForwardNav, BackwardNav, DownwardNav, UpwardNav};
