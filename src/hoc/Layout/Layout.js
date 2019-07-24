import React, { Component } from 'react';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    };

    render() {
        return (
            <Aux>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <div className={classes.Content}>{this.props.children}</div>
            </Aux>
        )
    }
};

export default Layout;