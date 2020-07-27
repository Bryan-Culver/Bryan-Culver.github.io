import React from 'react'
import './NavMenu.css'
import { slide as Menu } from 'react-burger-menu'
import jsonData from '../../Listing.json'

import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";

class NavMenu extends React.Component {
    constructor(props) {
        super(props);
        this.changeView = this.changeView.bind(this);
    }

    changeView = (item) => {
        this.setState({viewId: item});
        this.props.onChange(item);
    };

    render () {
        // get the component names from local json file
        console.log("from App.js: viewId: " + this.props.viewId);
        const loadData = () => JSON.parse(JSON.stringify(jsonData));

        let json = loadData();
        const menuItems = [];
        for (let key of Object.keys(json)) {
            menuItems.push(<NavMenuItem item={key} key={key} itemClick={this.changeView.bind(this)}/>);
        }

        return (
            <Menu disableAutoFocus >
                <ListGroup as="ul" variant={"flush"} defaultActiveKey="#menu-thruster">
                    {menuItems}
                </ListGroup>
            </Menu>
        );
    }
}

class NavMenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.itemClick(this.props.item);
    };

    render() {
        return(
            <ListGroup.Item key={this.props.item} action onClick={this.handleClick}>
                <h4>{this.props.item}</h4>
            </ListGroup.Item>
        );
    }
}

export default NavMenu;
