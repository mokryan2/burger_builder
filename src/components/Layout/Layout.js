import React, { Component } from 'react';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component{
    render(){
        return (
            <Aux>
                <Toolbar />
                <SideDrawer />
                <div className={classes.Content}>{this.props.children}</div>
            </Aux>
        )
    }
};

export default Layout;