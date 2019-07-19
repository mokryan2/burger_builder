import React from 'react';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = (props) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <div className={classes.Content}>{props.children}</div>
    </Aux>
);

export default layout